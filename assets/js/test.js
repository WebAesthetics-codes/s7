function drawOverlayWithCircle() {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const circleRadius = parseInt(50);
  const overlayOpacity = parseInt(50) / 100;

  // Clear the entire canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Create a semi-transparent overlay covering the whole canvas
  ctx.fillStyle = `rgba(0, 0, 0, ${overlayOpacity})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set composite operation to "punch through" the overlay
  ctx.globalCompositeOperation = "destination-out";

  // Draw the transparent circle at mouse position
  ctx.beginPath();
  ctx.arc(100, 100, circleRadius, 0, Math.PI * 2);
  ctx.fill();

  // Reset composite operation
  ctx.globalCompositeOperation = "source-over";

  // Add a border to the circle
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(100, 100, circleRadius, 0, Math.PI * 2);
  ctx.stroke();
}

drawOverlayWithCircle();
