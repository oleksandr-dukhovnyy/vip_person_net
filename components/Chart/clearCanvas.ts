import state from './state';

const clearCanvas = () => {
  state.ctx?.clearRect(0, 0, state.canvasSizes.width, state.canvasSizes.height);
};

export default clearCanvas;
