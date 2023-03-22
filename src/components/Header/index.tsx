import Image from 'next/image'
import { useState } from 'react';

export default function Header() {
    const [showSubMenu, setShowSubMenu] = useState(false)
    const [showSubMenu2, setShowSubMenu2] = useState(false)
    return (
        <>
            <header>
                <div id="sticky-none" className="tg-header__area transparent-header">
                    <div className="container">
                        <div className="row">
                            <div className={`col-12 ${showSubMenu ? 'mobile-menu-visible' : ''}`}>
                                <div className={`mobile-nav-toggler ${showSubMenu ? 'd-none' : ""}`} onClick={(e) => {
                                    e.preventDefault();
                                    setShowSubMenu(true)
                                }}>
                                    <i className="flaticon-menu-1"></i>
                                </div>
                                <div className="tgmenu__wrap">
                                    <nav className="tgmenu__nav">
                                        <div className="logo">
                                            <a className="light-logo" href="index.html">
                                                <img src="/images/logo.png" alt="Logo" />
                                            </a>
                                            <a className="dark-logo" href="index.html">
                                                <img src="/images/logo.png" alt="Logo" />
                                            </a>
                                        </div>
                                        <div
                                            className="tgmenu__navbar-wrap tgmenu__main-menu d-lg-flex d-none"
                                        >
                                            <ul id="menu-main" className="navigation">
                                                <li
                                                    id="menu-item-29968"
                                                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-29968"
                                                >
                                                    <a href="#">The First 2000</a>
                                                    <ul className="sub-menu">
                                                        <li
                                                            id="menu-item-29969"
                                                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-29969"
                                                        >
                                                            <a href="inscriptions/index.html"
                                                            >All Inscriptions</a
                                                            >
                                                        </li>
                                                        <li
                                                            id="menu-item-29970"
                                                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-29970"
                                                        >
                                                            <a
                                                                href="inscriptions/indexab59.html?_sort=like_amount_desc"
                                                            >Most Liked</a
                                                            >
                                                        </li>
                                                        <li
                                                            id="menu-item-29971"
                                                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-29971"
                                                        >
                                                            <a
                                                                href="inscriptions/index1e18.html?_cats=one-of-a-kind"
                                                            >1/1&#8217;s</a
                                                            >
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li
                                                    id="menu-item-29967"
                                                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-29967"
                                                >
                                                    <a href="collections/index.html">Collections</a>
                                                </li>
                                                <li
                                                    id="menu-item-11679"
                                                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-11679"
                                                >
                                                    <a href="https://ordinals.com/">Ordinals.com</a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className={`tgmenu__action ${showSubMenu ? 'd-none' : ""}`}>
                                            <ul className="list-wrap">
                                                <li className="header-social">
                                                    <a
                                                        href="https://twitter.com/tomich"
                                                        className="d-none d-sm-block"
                                                    ><i className="fab fa-twitter"></i></a>

                                                    <a href="#"><i className="fab fa-discord"></i></a>

                                                    <a
                                                        href="#"
                                                        className="d-blcok d-xl-none"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#connectModal"
                                                    ><i className="fas fa-wallet"></i></a>
                                                </li>

                                                <li className="header-btn">
                                                    <button
                                                        className="btn border-btn"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#connectModal"
                                                    >
                                                        Mint an Ordinal
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>

                                {/* <!-- Mobile Menu  --> */}
                                <div className="tgmobile__menu">
                                    <nav className="tgmobile__menu-box">
                                        <div className="close-btn" onClick={(e) => {
                                            e.preventDefault();
                                            setShowSubMenu(false)
                                        }}>
                                            <i className="flaticon-close-1"></i>
                                        </div>
                                        <div className="nav-logo">
                                            <a className="light-logo" href="index.html">
                                                <img src="./images/logo.png" alt="Logo" />
                                            </a>

                                            <a className="dark-logo" href="index.html">
                                                <img src="./images/logo.png" alt="Logo" />
                                            </a>
                                        </div>
                                        <div className="tgmobile__menu-outer">
                                            <ul id="menu-main-1" className="navigation">
                                                <li
                                                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children has-children menu-item-29968"
                                                >
                                                    <a href="#">The First 2000</a>
                                                    <ul className="sub-menu" style={{display: showSubMenu2 ? 'none' : 'block'}}>
                                                        <li
                                                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-29969"
                                                        >
                                                            <a href="inscriptions/index.html"
                                                            >All Inscriptions
                                                            </a>
                                                        </li>
                                                        <li
                                                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-29970"
                                                        >
                                                            <a
                                                                href="inscriptions/indexab59.html?_sort=like_amount_desc"
                                                            >Most Liked
                                                            </a>
                                                        </li>
                                                        <li
                                                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-29971"
                                                        >
                                                            <a
                                                                href="inscriptions/index1e18.html?_cats=one-of-a-kind"
                                                            >1/1 s</a>
                                                        </li>
                                                    </ul>
                                                    <div className={showSubMenu2 ? "dropdown-btn open" : "dropdown-btn"} onClick={(e) => {
                                                        e.preventDefault()
                                                        setShowSubMenu2(!showSubMenu2)
                                                    }}>
                                                        <span className={showSubMenu2 ? "plus-line" : "plus-line plus-line::after"}></span>
                                                    </div>
                                                </li>
                                                <li
                                                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-29967"
                                                >
                                                    <a href="collections/index.html">Collections</a>
                                                </li>
                                                <li
                                                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-11679"
                                                >
                                                    <a href="https://ordinals.com/">Ordinals.com</a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="social-links">
                                            <ul className="clearfix">
                                                <li className="twitter">
                                                    <a href="https://twitter.com/tomich"
                                                    ><i className="fab fa-twitter"></i></a>
                                                </li>

                                                <li className="discord">
                                                    <a href="#"><i className="fab fa-discord"></i></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                                <div className="tgmobile__menu-backdrop"></div>
                                {/* <!-- End Mobile Menu --> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Connect Wallet Modal --> */}
                {/* <div className="connect__modal">
                    <div
                        className="modal fade"
                        id="connectModal"
                        tabIndex={-1}
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal__wrapper">
                                    <div className="modal__header">
                                        <h2 className="title">Mint Ordinal</h2>
                                        <button data-bs-dismiss="modal" aria-label="Close">
                                            <i className="flaticon-close-1"></i>
                                        </button>
                                    </div>
                                    <div className="modal__body text-center">
                                        <p>Preferred ordinal mint partners.</p>
                                        <div className="connect__section">
                                            <ul className="list-wrap">
                                                <li>
                                                    <a href="https://gamma.io/" className="connect-meta"
                                                    ><img
                                                            src="core/views/e0cf69a7d6/assets/img/icons/metamask.svg"
                                                            alt="Gamma.io"
                                                        />Gamma.io</a
                                                    >
                                                </li>

                                                <li>
                                                    <a href="https://ordinalsbot.com/"
                                                    ><img
                                                            src="core/views/e0cf69a7d6/assets/img/icons/bitgo.svg"
                                                            alt="OrdinalsBot"
                                                        />OrdinalsBot</a
                                                    >
                                                </li>
                                            </ul>
                                        </div>
                                        <p className="privacy-text">
                                            Please reach out to each party with questions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <!-- Connect Wallet Modal --> */}
            </header >
        </>
    )
}
