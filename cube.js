// Basic 3D cube rotation driven by pointer drag (mouse, touch, trackpad).
// No inertia: every movement directly maps to rotation so users stay in control.
(function () {
  const body = document.body;
  body.classList.remove('no-js');
  body.classList.add('js-enabled');

  const cubes = Array.from(document.querySelectorAll('.cube'));

  const sensitivity = 0.35; // Degrees per pixel of pointer travel; tuned for steady rotation.
  const clampX = 85; // Prevents flipping upside-down while still feeling free.

  cubes.forEach(setupCube);

  function setupCube(cubeEl) {
    const state = {
      rotationX: -12,
      rotationY: 18,
      isDragging: false,
      startX: 0,
      startY: 0,
      dragThreshold: 10 // Pixels of movement before treating the gesture as a drag; higher to avoid blocking taps.
    };

    applyRotation();

    cubeEl.addEventListener('pointerdown', onPointerDown, { passive: false });
    cubeEl.addEventListener('click', onCubeClick, true);

    function onPointerDown(event) {
      // Do not prevent default so click-through navigation still works when no drag occurs.
      state.isDragging = false;
      state.startX = event.clientX;
      state.startY = event.clientY;

      const move = (e) => onPointerMove(e, event.target);
      const up = (e) => onPointerUp(e, move, up);

      window.addEventListener('pointermove', move, { passive: false });
      window.addEventListener('pointerup', up, { passive: false });
    }

    function onPointerMove(event, initialTarget) {
      const dx = event.clientX - state.startX;
      const dy = event.clientY - state.startY;

      if (!state.isDragging && Math.abs(dx) + Math.abs(dy) > state.dragThreshold) {
        state.isDragging = true;
      }

      if (!state.isDragging) return;

      state.rotationY += dx * sensitivity;
      state.rotationX = clamp(state.rotationX - dy * sensitivity, -clampX, clampX);
      state.startX = event.clientX;
      state.startY = event.clientY;
      applyRotation();

      // Prevent scrolling while dragging on touch/trackpad.
      event.preventDefault();
    }

    function onPointerUp(event, move, up) {
      window.removeEventListener('pointermove', move, { passive: false });
      window.removeEventListener('pointerup', up, { passive: false });
      state.isDragging = false;
    }

    function onCubeClick(event) {
      // If the gesture was a drag, suppress accidental clicks on faces.
      if (state.isDragging) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      state.isDragging = false;
    }

    function applyRotation() {
      cubeEl.style.transform = `rotateX(${state.rotationX}deg) rotateY(${state.rotationY}deg)`;
    }
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
})();
