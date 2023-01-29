div {
  background: red;
  animation: createBox .25s;
  width: 98px; height: 98px;
}
@keyframes createBox {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}