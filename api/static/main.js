<script>
        // JavaScript to change the background dynamically
        document.addEventListener('DOMContentLoaded', function () {
            const backgrounds = ['#f4f4f9', '#d3f8e2', '#f1d0a3', '#e5e5e5'];
            let index = 0;
            setInterval(() => {
                document.body.style.backgroundColor = backgrounds[index];
                index = (index + 1) % backgrounds.length;
            }, 5000);  // Change every 5 seconds
        });
    </script>