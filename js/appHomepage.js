export default class appHomepage{
    constructor(main){
        this.main = main;
        this.main.innerHTML = appHomepage.htmlContent();
    }
    static htmlContent(){
        return`
        <section class="notic">
            <h1>Welcome to Notic - Your Personal Productivity Hub</h1>
            <article>At Notic, we strive to empower you with a seamless and organized digital experience. Our platform serves as a versatile productivity hub, offering a range of applications to enhance your daily life.</article>
        </section>

        <section class="WD">
            <h3>What We Do:</h3>
            <article>
                <p>Explore a variety of applications tailored to meet your needs:</p>
                <ul>
                    <li><strong>Sticky Notes:</strong> Effortlessly jot down thoughts, ideas, and reminders with our intuitive Sticky Notes app.</li>

                    <li><strong>Calendar:</strong> Stay organized and never miss an important date with our feature-rich Calendar app.</li>

                    <li><strong>Favorites:</strong> Save and organize your favorite items, ensuring easy access whenever you need them.</li>

                    <li><strong>Help Center:</strong> Get assistance and guidance through our Help Center, ensuring a smooth user experience.</li>

                    <li><strong>Settings:</strong> Personalize your Notic experience with customizable settings.</li>
                </ul>
            </article>
        </section>

        <section class="about">
            <h3>About Us:</h3>
            <article>
                <p>At Notic, we are passionate about simplifying your digital life. Our team is dedicated to creating user-friendly applications that enhance your productivity and bring joy to your daily routine. Join us on this journey towards a more organized and efficient you!</p>
            </article>
        </section>

        <section class="contact">
            <h3>Contact Us:</h3>
            <article>
                <p>Have questions, feedback, or suggestions? We value your input! Reach out to us at [<a href="https://github.com/alirezabandegi">github.com/alirezabandegi</a>] and let us know how we can better serve you.</p>
            </article>
        </section>

        <section class="socials">
            <h3>Connect With Us:</h3>
            <article>
                <p>Follow us on social media to stay connected and receive real-time updates:</p>
                <ul>
                    <li><a href="https://www.instagram.com/">Instagram</a></li>
                    <li><a href="https://github.com/alirezabandegi">Github</a></li>
                </ul>
                <p>Thank you for choosing Notic - where productivity meets simplicity!</p>
            </article>
        </section>
        <footer>&copy;Alireza Bandegi</footer>
        `;
    }
}