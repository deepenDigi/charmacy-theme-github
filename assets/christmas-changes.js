document.addEventListener('DOMContentLoaded', function () {
    // Set up the canvas
    const canvas = document.getElementById("snowCanvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to cover the entire screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Snowflake properties and animation
    const snowflakes = [];
    let numSnowflakes = getSnowflakeCount();  // Set initial snowflake count
    let snowflakeSizeRange = getSnowflakeSize(); // Set initial size range

    // Snowflake constructor
    class Snowflake {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * (snowflakeSizeRange[1] - snowflakeSizeRange[0]) + snowflakeSizeRange[0]; // Random size
            this.speedY = Math.random() * 1 + 0.5; // Random speed between 0.5 and 1.5
            this.speedX = Math.random() * 0.5 - 0.25; // Slight random horizontal movement
        }

        // Update snowflake position
        update() {
            this.y += this.speedY;
            this.x += this.speedX;

            // Reset snowflake to top once it goes off the screen
            if (this.y > canvas.height) {
                this.y = -this.size;
                this.x = Math.random() * canvas.width;
            }

            // Reset horizontally if snowflake goes off-screen
            if (this.x > canvas.width || this.x < 0) {
                this.speedX = -this.speedX;
            }
        }

        // Draw snowflake with shadow (using ❆ symbol)
        draw() {
            ctx.font = `${this.size}px sans-serif`;

            // Set minimal shadow
            ctx.shadowColor = "rgba(255, 255, 255, 0.6)"; // Light white shadow
            ctx.shadowBlur = 4; // Soft blur
            ctx.shadowOffsetX = 2; // Slight horizontal shadow offset
            ctx.shadowOffsetY = 2; // Slight vertical shadow offset

            ctx.fillStyle = "white";
            ctx.fillText("❆", this.x, this.y);

            // Reset shadow to avoid affecting other elements
            ctx.shadowColor = "transparent";
        }
    }

    // Function to get snowflake count based on screen width
    function getSnowflakeCount() {
        return window.innerWidth <= 768 ? 10 : 15;  // 20 for mobile, 30 for desktop
    }

    // Function to get snowflake size range based on screen width
    function getSnowflakeSize() {
        return window.innerWidth <= 768 ? [3, 10] : [8, 20]; // Smaller size for mobile, larger for desktop
    }

    // Function to regenerate snowflakes when screen size changes
    function generateSnowflakes() {
        // Update snowflake count and size range based on window width
        numSnowflakes = getSnowflakeCount();
        snowflakeSizeRange = getSnowflakeSize();

        snowflakes.length = 0;  // Clear previous snowflakes

        // Generate new snowflakes
        for (let i = 0; i < numSnowflakes; i++) {
            snowflakes.push(new Snowflake());
        }
    }

    // Generate snowflakes initially
    generateSnowflakes();

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas on each frame

        // Update and draw each snowflake
        snowflakes.forEach(snowflake => {
            snowflake.update();
            snowflake.draw();
        });

        requestAnimationFrame(animate); // Keep animating
    }

    // Start animation
    animate();

    // Re-generate snowflakes on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        generateSnowflakes();
    });
});
