import Header from "../components/Header";
import Footer from "../components/Footer"
export default function About() {


    return (
        <>




            <Header />

            <div className="container">
                <div className="pages_heder">
                    <h2>Login Page</h2>
                    <ol className="breadcrumb">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="">Pages</a></li>
                        <li><a href="login.html" className="active">Login Page</a></li>
                    </ol>
                </div>
            </div>



            <section className="login_area">
                <div className="container">
                    <div className="login_inner">
                        <form className="row login_from">
                            <div className="form-group col-12">
                                <input type="email" className="form-control" name="email" placeholder="Email Address" />
                            </div>
                            <div className="form-group col-12">
                                <input type="password" className="form-control" name="password" placeholder="Password" />
                            </div>
                            {/* <div className="form-group col-12">
                                <input type="text" className="form-control" name="code"
                                    placeholder="Your Code ( 2fa if inavailed )" />
                            </div> */}
                            <div className="form-group larg_btn col-12">
                                <button className="defult_btn" type="submit">Login</button>
                            </div>
                            <div className="form-group col-sm-6">
                                <a href="#" className="reset_btn">Reset Password</a>
                            </div>
                            <div className="form-group col-sm-6">
                                <a href="register.html" className="reset_btn">Sign Up</a>
                            </div>
                            <h4 className="col-12">or login in with</h4>
                            <div className="form-group col-sm-6">
                                <a href="#" className="google_btn"><img src="images/google.png" alt="" />GOOGLE</a>
                            </div>
                            <div className="form-group col-sm-6">
                                <a href="#" className="google_btn"><i className="fa fa-facebook"></i>Sign Up</a>
                            </div>
                            <div className="col-12">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="check1" />
                                    <label className="custom-control-label" htmlFor="check1">I agree to the mora.com <a href="#">Terms
                                        of Service</a></label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <section className="connect_with_us">
                <div className="container">
                    <h2>Connect with us</h2>
                    <ul className="contact_with_socail">
                        <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                        <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                        <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="#"><i className="fa fa-youtube"></i></a></li>
                    </ul>
                </div>
            </section>
            <Footer />

        </>
    );
}
