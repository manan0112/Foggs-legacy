(function () {
  const body = document.body;
  body.classList.remove('no-js');
  body.classList.add('js-enabled');

  const cubes = Array.from(document.querySelectorAll('.cube'));

  const sensitivity = 0.9; // Higher = cube tracks pointer more tightly per pixel of movement.
  const clampX = 85;
  const friction = 0.88; // Velocity decay per RAF frame during momentum coast.

  cubes.forEach(setupCube);

  function setupCube(cubeEl) {
    const state = {
      rotationX: -12,
      rotationY: 18,
      isDragging: false,
      dragOccurred: false, // Stays true until click handler consumes it; suppresses accidental nav.
      startX: 0,
      startY: 0,
      velX: 0,
      velY: 0,
      // Raise threshold to avoid accidental small-pointer movements
      // being interpreted as drags which suppress link clicks.
      dragThreshold: 10,
      rafId: null
    };

    applyRotation();

    cubeEl.addEventListener('pointerdown', onPointerDown, { passive: false });
    cubeEl.addEventListener('click', onCubeClick, true);

    function onPointerDown(event) {
      if (state.rafId) {
        cancelAnimationFrame(state.rafId);
        state.rafId = null;
      }

      state.isDragging = false;
      state.dragOccurred = false;
      state.startX = event.clientX;
      state.startY = event.clientY;
      state.velX = 0;
      state.velY = 0;

      // Capture the pointer to this element so move events never bleed to sibling cubes.
      cubeEl.setPointerCapture(event.pointerId);

      cubeEl.addEventListener('pointermove', onPointerMove, { passive: false });
      cubeEl.addEventListener('pointerup', onPointerUp);
      cubeEl.addEventListener('pointercancel', onPointerUp);
    }

    function onPointerMove(event) {
      const dx = event.clientX - state.startX;
      const dy = event.clientY - state.startY;

      if (!state.isDragging && Math.abs(dx) + Math.abs(dy) > state.dragThreshold) {
        state.isDragging = true;
        state.dragOccurred = true;
        cubeEl.classList.add('dragging'); // Kills CSS transition so the cube tracks instantly.
      }

      if (!state.isDragging) return;

      state.velX = dx * sensitivity;
      state.velY = dy * sensitivity;

      state.rotationY += state.velX;
      state.rotationX = clamp(state.rotationX - state.velY, -clampX, clampX);
      state.startX = event.clientX;
      state.startY = event.clientY;
      applyRotation();

      event.preventDefault();
    }

    function onPointerUp(event) {
      cubeEl.removeEventListener('pointermove', onPointerMove);
      cubeEl.removeEventListener('pointerup', onPointerUp);
      cubeEl.removeEventListener('pointercancel', onPointerUp);
      state.isDragging = false;

      // If no drag occurred, attempt to navigate to the anchor beneath
      // the pointer. This covers platforms where click events are lost
      // due to pointer capture or touch-action handling.
      if (!state.dragOccurred && event && typeof event.clientX === 'number') {
        const el = document.elementFromPoint(event.clientX, event.clientY);
        const anchor = el && el.closest ? el.closest('a') : null;
        if (anchor && anchor.getAttribute && anchor.getAttribute('href')) {
          window.location.href = anchor.getAttribute('href');
          return;
        }
      }

      if (state.dragOccurred) {
        startMomentum();
      }
    }

    function startMomentum() {
      if (Math.abs(state.velX) < 0.1 && Math.abs(state.velY) < 0.1) {
        cubeEl.classList.remove('dragging'); // Re-enable transition now that cube is at rest.
        return;
      }

      state.rotationY += state.velX;
      state.rotationX = clamp(state.rotationX - state.velY, -clampX, clampX);
      state.velX *= friction;
      state.velY *= friction;
      applyRotation();

      state.rafId = requestAnimationFrame(startMomentum);
    }

    function onCubeClick(event) {
      // If a drag happened, suppress the click that would otherwise
      // trigger navigation. If no drag occurred, ensure the face's
      // anchor navigates (some platforms block default navigation
      // when pointer capture / touch-action is used).
      if (state.dragOccurred) {
        event.preventDefault();
        event.stopImmediatePropagation();
        state.dragOccurred = false;
        return;
      }

      // If the user clicked/tapped (no drag), find the nearest anchor
      // inside the cube and navigate to its href. Using JS navigation
      // avoids platform/browser quirks where the default action is lost.
      const anchor = event.target.closest && event.target.closest('a');
      if (anchor && anchor.getAttribute('href')) {
        const href = anchor.getAttribute('href');
        // For same-origin or relative links, assign the location.
        window.location.href = href;
      }
    }

    function applyRotation() {
      cubeEl.style.transform = `rotateX(${state.rotationX}deg) rotateY(${state.rotationY}deg)`;
    }
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
})();
