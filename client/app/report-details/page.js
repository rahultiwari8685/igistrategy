import Footer from "../components/Footer";
import Header from "../components/Header";
export default function ShopDetails() {


    return (
        <>
            <Header />

            {/* <div className="container">
                <div className="pages_heder">
                    <h2>Shop Details</h2>
                    <ol className="breadcrumb">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="index.html">Shop</a></li>
                        <li><a href="shop-details.html" className="active">Shop Details</a></li>
                    </ol>
                </div>
            </div> */}

            {/* <section className="shop_banner">
                <div className="container">
                    <div className="row">
                        <a href="#" className="col-12 add_aera"><img src="https://themazine.com/html/mora-blog/images/shop/add.jpg"
                            alt="" /></a>

                        <div className="col-lg-3 col-md-6">
                            <div className="slider_offer">
                                <a href="shop-details.html">Free Shipping</a>
                                <img src="https://themazine.com/html/mora-blog/images/shop/shop-slider-bottom-1.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6  order-lg-last">
                            <div className="slider_offer">
                                <a href="shopDetails.html">Free Shipping</a>
                                <img src="https://themazine.com/html/mora-blog/images/shop/shop-slider-bottom-2.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="slider_offer">
                                <a href="shopDetails.html" className="middle_offer">55% OFF <small>First order</small></a>
                                <img src="https://themazine.com/html/mora-blog/images/shop/shop-slider-bottom-3.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <section className="shop_with_sidebar">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 shop_right_sidebar">
                            {/* <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search Product" />
                                <div className="input-group-append">
                                    <span className="input-group-text theme_btn"><i className="fa fa-search"></i></span>
                                </div>
                            </div> */}

                            <div className="s_widget">
                                <h4>Filter Reports</h4>

                                {/* State Filter */}
                                <div className="mb-3">
                                    <label className="block text-sm font-medium mb-1">
                                        Select State
                                    </label>
                                    <select className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="">All States</option>
                                        <option value="maharashtra">Maharashtra</option>
                                        <option value="uttar-pradesh">Uttar Pradesh</option>
                                        <option value="bihar">Bihar</option>
                                        <option value="rajasthan">Rajasthan</option>
                                    </select>
                                </div>

                                {/* Constituency Filter */}
                                <div className="mb-3">
                                    <label className="block text-sm font-medium mb-1">
                                        Select Constituency
                                    </label>
                                    <select className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="">All Constituencies</option>
                                        <option value="mumbai-north">Mumbai North</option>
                                        <option value="lucknow">Lucknow</option>
                                        <option value="patna-sahib">Patna Sahib</option>
                                        <option value="jaipur">Jaipur</option>
                                    </select>
                                </div>

                                {/* Apply Button */}
                                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                                    Apply Filters
                                </button>
                            </div>


                        </div>

                        <div className="col-lg-9 shop_left_sidebar">
                            <div className="row">
                                <div className="col-md-6 min_img">
                                    <img src="https://themazine.com/html/mora-blog/images/shop/shop-big-1.jpg" alt="" />
                                    {/* <ul className="product_size">
                                        <li>Size : </li>
                                        <li className="active">S</li>
                                        <li>M</li>
                                        <li>L</li>
                                        <li>XL</li>
                                        <li>XXL</li>
                                    </ul> */}
                                </div>
                                <div className="col-md-6 product_details">
                                    <h2>Ground Reporting</h2>
                                    {/* <h1>$69 <span>$89</span><small>In stock</small></h1> */}
                                    <h4>Categories: Politics</h4>
                                    <ul className="rating">
                                        <li>
                                            <a href="#"><i className="fa fa-star"></i></a>
                                            <a href="#"><i className="fa fa-star"></i></a>
                                            <a href="#"><i className="fa fa-star"></i></a>
                                            <a href="#"><i className="fa fa-star"></i></a>
                                            <a href="#"><i className="fa fa-star-half-o"></i></a>
                                        </li>
                                    </ul>
                                    <p>An ideal pick for casual summer styling is this black T-shirt from Jack &amp; Jones. This
                                        half-sleeved T-shirt, tailored from cotton assures </p>
                                    <ul className="value-section">
                                        {/* <li><button className="tran3s" id="value-decrease"><i className="fa fa-angle-left"
                                            aria-hidden="true"></i></button></li>
                                        <li id="product-value">1</li>
                                        <li><button className="tran3s" id="value-increase"><i className="fa fa-angle-right"
                                            aria-hidden="true"></i></button> </li> */}
                                        <li><a href="/pricing" className="theme_btn">Subscribe Now</a></li>
                                    </ul>
                                </div>
                                <div className="review-tab col-12">
                                    <ul className="nav nav-tabs">
                                        <li><a data-toggle="tab" href="#home" className="active theme_btn">Description</a></li>
                                        <li><a data-toggle="tab" href="#menu1" className="theme_btn">Additional Information</a></li>
                                        <li><a data-toggle="tab" href="#menu2" className="theme_btn">Reviews (0)</a></li>
                                    </ul>
                                    <div className="tab-content">
                                        <div id="home" className="tab-pane fade in active show">
                                            <p>An ideal pick for casual summer styling is this black T-shirt from Jack &amp;
                                                Jones. This half-sleeved T-shirt, tailored from cotton assures immense comfort
                                                throughout the wear. Decked with all-over striped pattern, it can be best teamed
                                                with denims and sneakers.</p>
                                            <p>Further, Google is no longer permitting the use of its ads on sites that trigger
                                                pop-under pages, even if the pop-unders do not contain an ad</p>
                                        </div>
                                        <div id="menu1" className="tab-pane fade">
                                            <p>Google has updated its AdSense ad policies, no longer permitting the use of such
                                                ads on pop-under pages. This decision was made because the company believes ads
                                                on pop-under pages do not provide a good user experience. “Pop-under ads can be
                                                annoying as well, as they will “pop under” your window, so that you don’t see
                                                them until you minimize your browser. We do not believe these ads provide a good
                                                user experience, and therefore are not suitable for Google ads.”</p>
                                        </div>
                                        <div id="menu2" className="tab-pane fade">

                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <h2 className="r_heding">Related Report</h2>
                                </div>

                                <div className="col-md-4 col-sm-6">
                                    <div className="shop_items">
                                        <a href="shop-details.html" className="shop_img"><img
                                            src="https://themazine.com/html/mora-blog/images/shop/shop-9.jpg" alt="" /></a>
                                        <div className="shop_text">
                                            <a href="shop-details.html" className="s_heding">Bonsai tree 2A2</a>
                                            <h4>$86</h4>
                                            <a href="shop-details.html" className="theme_btn">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 col-sm-6">
                                    <div className="shop_items">
                                        <a href="shop-details.html" className="shop_img"><img
                                            src="https://themazine.com/html/mora-blog/images/shop/shop-7.jpg" alt="" /></a>
                                        <div className="shop_text">
                                            <a href="shop-details.html" className="s_heding">Annie spratt</a>
                                            <h4>$19</h4>
                                            <a href="shop-details.html" className="theme_btn">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 col-sm-6">
                                    <div className="shop_items">
                                        <a href="shop-details.html" className="shop_img"><img
                                            src="https://themazine.com/html/mora-blog/images/shop/shop-8.jpg" alt="" /></a>
                                        <div className="shop_text">
                                            <a href="shop-details.html" className="s_heding">Wall Watch</a>
                                            <h4>$79</h4>
                                            <a href="shop-details.html" className="theme_btn">Add to Cart</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
