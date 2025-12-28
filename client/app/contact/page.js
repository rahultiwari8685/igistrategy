import Header from "../components/Header";
import Footer from "../components/Footer"
export default function Contact() {


    return (
        <>




            <Header />

            <div className="container">
                <div className="pages_heder">
                    <h2>Contact Us</h2>
                    <ol className="breadcrumb">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="contact.html" className="active">Contact</a></li>
                    </ol>
                </div>
            </div>

            <section className="contact_area">
                <div className="container">
                    <form className="row from_main" action="php/contact.php" method="post" id="phpcontactform"
                        noValidate="novalidate">
                        <div className="form-group col-md-6">
                            <input type="text" className="form-control" id="name" name="name" placeholder="Name" />
                        </div>
                        <div className="form-group col-md-6">
                            <input type="email" className="form-control" id="email" name="email" placeholder="Email" />
                        </div>
                        <div className="form-group col-md-6">
                            <input type="text" className="form-control" id="company" name="company" placeholder="Company" />
                        </div>
                        <div className="form-group col-md-6">
                            <select className="post_select" style={{ display: "none" }}>
                                <option>Select request</option>
                                <option>Travel Post</option>
                                <option>Finance Post</option>
                                <option>Trading Post</option>
                                <option>Tech Post</option>
                                <option>Vodeo Post</option>
                            </select>
                            <div className="nice-select post_select" tabIndex="0"><span className="current">Select request</span>
                                <ul className="list">
                                    <li data-value="Select request" className="option selected">Select request</li>
                                    <li data-value="Travel Post" className="option">Travel Post</li>
                                    <li data-value="Finance Post" className="option">Finance Post</li>
                                    <li data-value="Trading Post" className="option">Trading Post</li>
                                    <li data-value="Tech Post" className="option">Tech Post</li>
                                    <li data-value="Vodeo Post" className="option">Vodeo Post</li>
                                </ul>
                            </div>
                        </div>
                        <div className="form-group col-12">
                            <textarea className="form-control" id="message" name="message" placeholder="Message"></textarea>
                        </div>
                        <div className="form-group col-12">
                            <button className="submit_btn btn" id="js-contact-btn" type="submit">SEND Request <i
                                className="fa fa-arrow-right"></i></button>
                            <div id="js-contact-result" data-success-msg="Form submitted successfully."
                                data-error-msg="Messages Successfully"></div>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />

        </>
    );
}
