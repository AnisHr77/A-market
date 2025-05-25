import React,{NavLink} from 'react'
import './Footer.css'
import { RiFacebookLine } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXFill } from "react-icons/ri";
import { RiLinkedinLine } from "react-icons/ri";
import {Route} from "react-router-dom";
import Vision from "./contentFooter/Vision";

const Footer = () => {
    return (
        <div className='Footer'>

            <div className="FooterContainer">
                <div className="About">


                    <ul>
                        <h3>About A+ Group</h3>
                        <li><a href ={"/visiMission"} className={"aFooter"}> Our vision & Mission</a></li>
                        <li><a href ={"/ContactUs"} className={"aFooter"}> Contact us</a></li>
                        <li> <a href ={"/NewsUp"} className={"aFooter"}>News & Updates</a></li>
                        <li> <a href ={"/Story"} className={"aFooter"}> Our Story  </a></li>
                        <li> <a href ={"/Community"} className={"aFooter"}>   Community impact</a></li>
                        <li> <a href ={"/Sustainability"} className={"aFooter"}>   Sustainability Commitment</a></li>
                        <li><a href ={"/Awards"} className={"aFooter"}> Awards & Recognition </a></li>
                    </ul>
                </div>

                <div className="Customer">
                    <ul>
                        <h3>Customer Services</h3>
                        <li><a href={"/Return"} className={"aFooter"}>Return & Refund Policy</a></li>
                        <li> <a href={"/Track"} className={"aFooter"}>Track Your Order</a></li>
                        <li><a href={"/FAQs"} className={"aFooter"}> FAQs & Help Center</a></li>
                        <li> <a href={"/LiveS"} className={"aFooter"}> 24/7 Live Support  </a></li>
                        <li> <a href={"/Report"} className={"aFooter"}> Report an Issue </a></li>

                    </ul>

                </div>


                <div className="Policies">
                    <ul>
                        <h3>Policies & Legal</h3>
                        <li><a href={"/Privacy"} className={"aFooter"}> Privacy Policy</a></li>
                        <li><a href={"/TermsS"} className={"aFooter"}> Terms of Service</a></li>
                        <li><a href={"/IntellectualP"} className={"aFooter"}> Intellectual Property</a></li>
                        <li><a href={"/SecurityC"} className={"aFooter"}>  Security Center  </a></li>
                    </ul>

                </div>

                <div className="Features">
                    <ul>
                    <h3> Our Features</h3>
                        <div className="listefooter-OurFeatures">
                    <li ><a href={"/CardFooter"} className={"aFooter4"}><svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1H1.36325C2.00458 1 2.32581 1 2.58739 1.11872C2.81802 1.22339 3.0152 1.39191 3.15739 1.6056C3.3184 1.84758 3.37653 2.17069 3.49258 2.81566L6.41467 19.0556L20.5222 19.0556C21.1356 19.0556 21.4433 19.0556 21.6974 18.9443C21.9219 18.8461 22.1155 18.687 22.2593 18.4846C22.4218 18.2558 22.4907 17.9496 22.6284 17.3376L22.6294 17.3333L24.7536 7.88883L24.754 7.88686C24.9628 6.95855 25.0675 6.49327 24.9526 6.12831C24.8517 5.80808 24.6396 5.53659 24.3581 5.36378C24.0371 5.16667 23.5733 5.16667 22.6432 5.16667H4.38414M21.3048 26C20.5572 26 19.9512 25.3782 19.9512 24.6111C19.9512 23.844 20.5572 23.2222 21.3048 23.2222C22.0524 23.2222 22.6585 23.844 22.6585 24.6111C22.6585 25.3782 22.0524 26 21.3048 26ZM7.76828 26C7.02067 26 6.41462 25.3782 6.41462 24.6111C6.41462 23.844 7.02067 23.2222 7.76828 23.2222C8.51588 23.2222 9.12193 23.844 9.12193 24.6111C9.12193 25.3782 8.51588 26 7.76828 26Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                        Card</a></li><li className={"aFooter4"} style={{marginLeft:"48px"}}><svg width="5" height="25" viewBox="0 0 2 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="1" y1="18.0146" x2="1" y2="0.000139236" stroke="white" stroke-width="2"/>
                        </svg></li>

                            <li ><a href={"/SavesFooter"} className={"aFooter4"} ><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_1_6595)">
                                    <path d="M19.8334 3.5H8.16671C6.88337 3.5 5.84504 4.55 5.84504 5.83333L5.83337 24.5L14 21L22.1667 24.5V5.83333C22.1667 4.55 21.1167 3.5 19.8334 3.5ZM19.8334 21L14 18.4567L8.16671 21V5.83333H19.8334V21Z" fill="white"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_1_6595">
                                        <rect width="28" height="28" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                                Saves  </a></li> </div>
                            <div className="listefooter-OurFeatures">
                    <li><a href={"/ChatFooter"} className={"aFooter4"}><svg width="27" height="23" viewBox="0 0 27 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M26 21.9999C26 19.5616 23.6811 17.4873 20.4444 16.7186M17.6667 22C17.6667 18.9072 13.9357 16.4 9.33333 16.4C4.73096 16.4 1 18.9072 1 22M17.6667 12.2C20.7349 12.2 23.2222 9.69279 23.2222 6.6C23.2222 3.50721 20.7349 1 17.6667 1M9.33333 12.2C6.26508 12.2 3.77778 9.69279 3.77778 6.6C3.77778 3.50721 6.26508 1 9.33333 1C12.4016 1 14.8889 3.50721 14.8889 6.6C14.8889 9.69279 12.4016 12.2 9.33333 12.2Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                        Chat</a></li>
                            <li className={"aFooter4"} style={{marginLeft:"83px"}}><svg width="5" height="25" viewBox="0 0 2 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="1" y1="18.0146" x2="1" y2="0.000139236" stroke="white" stroke-width="2"/>
                    </svg></li>

                                <li><a href={"/DarkModeFooter"} className={"aFooter4"}><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.375 6.25004C9.375 11.4277 13.5723 15.625 18.75 15.625C19.6971 15.625 20.6115 15.485 21.4733 15.2237C20.3066 19.0732 16.7305 21.8749 12.5 21.8749C7.32233 21.8749 3.125 17.6779 3.125 12.5002C3.125 8.26966 5.92716 4.69361 9.77667 3.52686C9.51545 4.3887 9.375 5.3029 9.375 6.25004Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>Dark Mode</a></li></div><div className="listefooter-OurFeatures">
                        <li><a href={"/CategoriesFooter"} className={"aFooter4"}> <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.66663 22.6668H25.3333M6.66663 16.0002H25.3333M6.66663 9.3335H25.3333" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                            Categories  </a></li><li className={"aFooter4"} ><svg width="5" height="25" viewBox="0 0 2 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="1" y1="18.0146" x2="1" y2="0.000139236" stroke="white" stroke-width="2"/>
                    </svg></li>
                        <li><a href={"/TrackingFooter"} className={"aFooter4"}> <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1_6607)">
                            <path d="M8.45829 22.9583C9.79298 22.9583 10.875 21.8764 10.875 20.5417C10.875 19.207 9.79298 18.125 8.45829 18.125C7.1236 18.125 6.04163 19.207 6.04163 20.5417C6.04163 21.8764 7.1236 22.9583 8.45829 22.9583Z" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20.5417 22.9583C21.8764 22.9583 22.9583 21.8764 22.9583 20.5417C22.9583 19.207 21.8764 18.125 20.5417 18.125C19.207 18.125 18.125 19.207 18.125 20.5417C18.125 21.8764 19.207 22.9583 20.5417 22.9583Z" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.04163 20.542H5.62496C4.52039 20.542 3.62496 19.6466 3.62496 18.542V15.7087M2.41663 6.04199H13.7083C14.8129 6.04199 15.7083 6.93742 15.7083 8.04199V20.542M10.875 20.542H18.125M22.9583 20.542H23.375C24.4795 20.542 25.375 19.6466 25.375 18.542V13.292M25.375 13.292H15.7083M25.375 13.292L22.3326 8.22133C21.9711 7.61892 21.3201 7.25033 20.6176 7.25033H15.7083" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.80005 20.2998H5.38338C4.27881 20.2998 3.38338 19.4044 3.38338 18.2998V15.4665M2.17505 5.7998H13.4667C14.5713 5.7998 15.4667 6.69524 15.4667 7.7998V20.2998M10.875 20.2998H17.8834M23.2 20.2998V20.2998C24.2678 20.2998 25.1334 19.4342 25.1334 18.3665V13.0498M25.1334 13.0498H15.4667M25.1334 13.0498L22.091 7.97915C21.7295 7.37674 21.0785 7.00814 20.376 7.00814H15.4667" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M3.625 8.56836H8.45833" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M1.31824 11.2046H6.15157" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M3.625 13.8408H8.45833" stroke="#FAFAFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_1_6607">
                                <rect width="29" height="29" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                        Tracking  </a></li>
                    </div>
                        <div className="listefooter-OurFeatures">

                            <li><a href={"/ChatFooter"} className={"aFooter4"}  ><svg width="100" height="100" style={{position:'relative',left:"-36px",top:"-27px"}} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M58.014 26.7172L58.9024 24H60.4463L61.3347 26.7172L64 27.6229V29.1968L61.3347 30.1025L60.4463 32.8197H58.9024L58.014 30.1025L55.3487 29.1968V27.6229L58.014 26.7172Z" fill="#FFFCFF"/>
                                <path d="M61.0305 35.3224V45H58.3182V35.3224H61.0305Z" fill="#FFFCFF"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M46.5706 27.0273H51.0802L55.6507 45H52.8488L51.7941 40.8525H45.8567L44.8019 45H42L46.5706 27.0273ZM46.5598 38.0874H51.0909L48.9815 29.7924H48.6693L46.5598 38.0874Z" fill="#FFFCFF"/>
                            </svg>

                                <p style={{position:'relative',left:"-66px",top:"-39px"}}>Ai chat</p></a></li>

                            </div>
                    </ul>
                </div>
            </div>

            <div className="Bottom">
                <div className="Payment">

                        <h3>Payment Methodes</h3>
                        <div>
                            <svg width="77" height="58" viewBox="0 0 77 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_1_6613)">
                                <rect x="9.32292" y="9.32292" width="58.3542" height="39.3542" rx="14.5521" fill="white" stroke="#D9D9D9" stroke-width="2.64583"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M38.9357 38.0247C36.859 39.8242 34.1651 40.9104 31.2215 40.9104C24.6532 40.9104 19.3286 35.5019 19.3286 28.8302C19.3286 22.1585 24.6532 16.75 31.2215 16.75C34.1652 16.75 36.8591 17.8363 38.9358 19.6359C41.0125 17.8364 43.7064 16.7501 46.65 16.7501C53.2183 16.7501 58.5429 22.1586 58.5429 28.8303C58.5429 35.5021 53.2183 40.9106 46.65 40.9106C43.7063 40.9106 41.0124 39.8242 38.9357 38.0247Z" fill="#ED0006"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M38.9358 38.0246C41.4929 35.8089 43.1143 32.5119 43.1143 28.8302C43.1143 25.1485 41.4929 21.8515 38.9358 19.6358C41.0125 17.8363 43.7064 16.75 46.65 16.75C53.2183 16.75 58.5429 22.1585 58.5429 28.8302C58.5429 35.5019 53.2183 40.9104 46.65 40.9104C43.7064 40.9104 41.0125 39.8241 38.9358 38.0246Z" fill="#F9A000"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M38.9358 38.0245C41.4929 35.8088 43.1143 32.5118 43.1143 28.8301C43.1143 25.1485 41.4929 21.8515 38.9358 19.6357C36.3787 21.8515 34.7572 25.1485 34.7572 28.8301C34.7572 32.5118 36.3787 35.8088 38.9358 38.0245Z" fill="#FF5E00"/>
                            </g>
                            <defs>
                                <filter id="filter0_d_1_6613" x="0.440945" y="0.440945" width="76.1181" height="57.1181" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset/>
                                    <feGaussianBlur stdDeviation="3.77953"/>
                                    <feComposite in2="hardAlpha" operator="out"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_6613"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_6613" result="shape"/>
                                </filter>
                            </defs>
                        </svg>
                        </div>

                        <div>
                            <svg width="77" height="58" viewBox="0 0 77 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d_1_6614)">
                                    <rect x="9.32292" y="9.32292" width="58.3542" height="39.3542" rx="14.5521" fill="white" stroke="#D9D9D9" stroke-width="2.64583"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M25.2543 34.6714H22.5431C22.3575 34.6714 22.1997 34.8068 22.1708 34.9906L21.0743 41.9715C21.0525 42.1093 21.1587 42.2334 21.2979 42.2334H22.5922C22.7777 42.2334 22.9355 42.098 22.9645 41.9138L23.2602 40.031C23.2888 39.8466 23.4469 39.7114 23.6321 39.7114H24.4904C26.2763 39.7114 27.307 38.8436 27.5763 37.124C27.6976 36.3717 27.5815 35.7805 27.2305 35.3664C26.8452 34.912 26.1617 34.6714 25.2543 34.6714ZM25.5671 37.2211C25.4188 38.1979 24.6755 38.1979 23.9568 38.1979H23.5476L23.8347 36.3735C23.8517 36.2633 23.9468 36.1821 24.0579 36.1821H24.2454C24.735 36.1821 25.1969 36.1821 25.4355 36.4623C25.5777 36.6295 25.6214 36.8779 25.5671 37.2211ZM33.3588 37.1897H32.0604C31.9498 37.1897 31.8542 37.271 31.8372 37.3813L31.7797 37.7459L31.6889 37.6138C31.4079 37.2041 30.7812 37.0672 30.1556 37.0672C28.7207 37.0672 27.4954 38.1583 27.2567 39.6889C27.1327 40.4523 27.309 41.1823 27.7403 41.6915C28.1361 42.1596 28.7022 42.3546 29.3757 42.3546C30.5317 42.3546 31.1729 41.6082 31.1729 41.6082L31.1149 41.9706C31.093 42.1091 31.1993 42.2332 31.3376 42.2332H32.5072C32.6932 42.2332 32.85 42.0979 32.8794 41.9136L33.5811 37.4517C33.6033 37.3144 33.4975 37.1897 33.3588 37.1897ZM31.5489 39.7271C31.4236 40.4718 30.8349 40.9718 30.0842 40.9718C29.7072 40.9718 29.4058 40.8504 29.2124 40.6203C29.0205 40.3919 28.9475 40.0666 29.0086 39.7044C29.1256 38.9659 29.7243 38.4497 30.4636 38.4497C30.8322 38.4497 31.1319 38.5726 31.3293 38.8047C31.5271 39.0392 31.6056 39.3664 31.5489 39.7271ZM38.9688 37.1896H40.2735C40.4562 37.1896 40.5628 37.3953 40.459 37.5458L36.1196 43.8351C36.0494 43.937 35.9336 43.9976 35.81 43.9976H34.5069C34.3234 43.9976 34.2163 43.7902 34.3225 43.6393L35.6737 41.7243L34.2366 37.4896C34.1869 37.3424 34.2951 37.1896 34.4511 37.1896H35.7331C35.8997 37.1896 36.0466 37.2993 36.0947 37.4594L36.8573 40.017L38.6569 37.3555C38.7273 37.2516 38.8444 37.1896 38.9688 37.1896Z" fill="#253B80"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M53.1146 41.9719L54.2273 34.8633C54.2444 34.753 54.3396 34.6718 54.4502 34.6714H55.7029C55.8412 34.6714 55.9474 34.7959 55.9256 34.9337L54.8283 41.9142C54.7997 42.0984 54.6419 42.2338 54.4561 42.2338H53.3373C53.199 42.2338 53.0928 42.1096 53.1146 41.9719ZM44.5931 34.6718H41.8814C41.6963 34.6718 41.5385 34.8072 41.5095 34.991L40.413 41.9719C40.3912 42.1096 40.4974 42.2338 40.6359 42.2338H42.0273C42.1566 42.2338 42.2672 42.1391 42.2874 42.0102L42.5986 40.0314C42.6272 39.847 42.7853 39.7118 42.9704 39.7118H43.8283C45.6146 39.7118 46.6451 38.8439 46.9146 37.1243C47.0363 36.372 46.9194 35.7809 46.5686 35.3668C46.1835 34.9123 45.5005 34.6718 44.5931 34.6718ZM44.9059 37.2214C44.7581 38.1983 44.0147 38.1983 43.2955 38.1983H42.8868L43.1743 36.3739C43.1913 36.2637 43.2856 36.1825 43.397 36.1825H43.5845C44.0738 36.1825 44.5361 36.1825 44.7746 36.4627C44.9169 36.6299 44.9602 36.8782 44.9059 37.2214ZM52.6969 37.1901H51.3995C51.2879 37.1901 51.1932 37.2713 51.1766 37.3817L51.1191 37.7462L51.028 37.6142C50.7469 37.2045 50.1206 37.0676 49.495 37.0676C48.0601 37.0676 46.8352 38.1587 46.5965 39.6893C46.4728 40.4527 46.6484 41.1827 47.0797 41.6919C47.4762 42.1599 48.0416 42.355 48.7151 42.355C49.8711 42.355 50.5121 41.6086 50.5121 41.6086L50.4543 41.9709C50.4324 42.1095 50.5387 42.2336 50.6779 42.2336H51.8469C52.032 42.2336 52.1898 42.0982 52.2188 41.914L52.9209 37.4521C52.9423 37.3148 52.8361 37.1901 52.6969 37.1901ZM50.8872 39.7274C50.7627 40.4722 50.1732 40.9721 49.4223 40.9721C49.046 40.9721 48.7441 40.8507 48.5505 40.6207C48.3586 40.3922 48.2865 40.0669 48.3469 39.7048C48.4645 38.9663 49.0624 38.4501 49.8017 38.4501C50.1705 38.4501 50.4701 38.573 50.6676 38.8051C50.8661 39.0396 50.9447 39.3667 50.8872 39.7274Z" fill="#179BD7"/>
                                    <path d="M35.2878 32.1742L35.6212 30.0484L34.8787 30.0311H31.3334L33.7972 14.3444C33.8048 14.297 33.8297 14.2528 33.866 14.2215C33.9024 14.1901 33.9489 14.1729 33.9974 14.1729H39.9754C41.9601 14.1729 43.3296 14.5875 44.0447 15.406C44.3799 15.79 44.5934 16.1912 44.6967 16.6327C44.805 17.0961 44.807 17.6496 44.7011 18.3247L44.6934 18.374V18.8066L45.0288 18.9973C45.3111 19.1477 45.5353 19.3198 45.7074 19.5169C45.9943 19.8452 46.1798 20.2625 46.2581 20.7571C46.339 21.2659 46.3123 21.8712 46.1798 22.5566C46.0268 23.345 45.7795 24.0317 45.4456 24.5935C45.1383 25.1112 44.747 25.5405 44.2825 25.8734C43.8389 26.1895 43.3118 26.4295 42.7159 26.5832C42.1384 26.734 41.4801 26.8103 40.758 26.8103H40.2928C39.9602 26.8103 39.6369 26.9306 39.3834 27.1463C39.1291 27.3664 38.9607 27.6671 38.9091 27.9961L38.8741 28.1875L38.2852 31.9341L38.2584 32.0717C38.2514 32.1154 38.2393 32.1371 38.2215 32.1519C38.2056 32.1651 38.1826 32.1742 38.1603 32.1742H35.2878Z" fill="#253B80"/>
                                    <path d="M45.3463 18.4243C45.3285 18.5389 45.3081 18.656 45.2852 18.7763C44.4967 22.8405 41.7997 24.2445 38.3549 24.2445H36.601C36.1798 24.2445 35.8248 24.5517 35.7591 24.9689L34.8611 30.6874L34.6068 32.3083C34.564 32.5822 34.7745 32.8292 35.0497 32.8292H38.1606C38.529 32.8292 38.8418 32.5605 38.8997 32.1957L38.9304 32.037L39.5162 28.3048L39.5538 28.1002C39.611 27.7342 39.9245 27.4654 40.2929 27.4654H40.7582C43.772 27.4654 46.1315 26.2367 46.8211 22.6812C47.1092 21.1959 46.96 19.9557 46.1977 19.0834C45.9671 18.8204 45.6809 18.6022 45.3463 18.4243Z" fill="#179BD7"/>
                                    <path d="M44.5212 18.0937C44.4009 18.0585 44.2765 18.0265 44.149 17.9977C44.0209 17.9696 43.8896 17.9446 43.7545 17.9228C43.2816 17.846 42.7635 17.8096 42.2084 17.8096H37.5228C37.4074 17.8096 37.2979 17.8358 37.1997 17.8832C36.9836 17.9875 36.8231 18.1929 36.7842 18.4444L35.7873 24.7836L35.7587 24.9685C35.8243 24.5513 36.1793 24.2441 36.6006 24.2441H38.3544C41.7992 24.2441 44.4965 22.8395 45.2848 18.7759C45.3083 18.6556 45.3281 18.5385 45.3459 18.4239C45.1465 18.3177 44.9303 18.2268 44.6977 18.1494C44.6405 18.1302 44.5812 18.1116 44.5212 18.0937Z" fill="#222D65"/>
                                    <path d="M36.7842 18.4444C36.8231 18.1929 36.9838 17.9875 37.1997 17.8838C37.2986 17.8365 37.4076 17.8102 37.5228 17.8102H42.2085C42.7637 17.8102 43.2817 17.8467 43.7545 17.9235C43.8897 17.9453 44.0211 17.9702 44.1491 17.9984C44.2766 18.0272 44.4008 18.0592 44.5214 18.0944C44.5812 18.1123 44.6404 18.1308 44.6984 18.1494C44.931 18.2268 45.1472 18.3184 45.3466 18.4239C45.5812 16.922 45.3447 15.8994 44.5361 14.9734C43.6444 13.954 42.0351 13.5176 39.976 13.5176H33.9978C33.5771 13.5176 33.2185 13.8247 33.1533 14.2426L30.6634 30.0906C30.6143 30.4041 30.8551 30.6871 31.17 30.6871H34.8608L35.7874 24.7836L36.7842 18.4444Z" fill="#253B80"/>
                                </g>
                                <defs>
                                    <filter id="filter0_d_1_6614" x="0.440945" y="0.440945" width="76.1181" height="57.1181" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset/>
                                        <feGaussianBlur stdDeviation="3.77953"/>
                                        <feComposite in2="hardAlpha" operator="out"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_6614"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_6614" result="shape"/>
                                    </filter>
                                </defs>
                            </svg>

                        </div>

                        <div>
                            <svg width="77" height="58" viewBox="0 0 77 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d_1_6615)">
                                    <rect x="9.32292" y="9.32292" width="58.3542" height="39.3542" rx="14.5521" fill="white" stroke="#D9D9D9" stroke-width="2.64583"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M26.5183 36.4521H22.8229L20.0518 25.8368C19.9203 25.3485 19.641 24.9168 19.2302 24.7133C18.205 24.202 17.0753 23.7951 15.8429 23.5899V23.1812H21.7959C22.6175 23.1812 23.2337 23.7951 23.3364 24.5081L24.7742 32.1652L28.4679 23.1812H32.0606L26.5183 36.4521ZM34.1146 36.4521H30.6246L33.4984 23.1812H36.9884L34.1146 36.4521ZM41.5036 26.8575C41.6063 26.1427 42.2225 25.734 42.9414 25.734C44.0711 25.6314 45.3017 25.8367 46.3287 26.3462L46.9449 23.4889C45.9179 23.0802 44.7882 22.875 43.763 22.875C40.3757 22.875 37.9109 24.7132 37.9109 27.2644C37.9109 29.2052 39.6568 30.2243 40.8892 30.8382C42.2225 31.4504 42.736 31.8591 42.6333 32.4712C42.6333 33.3894 41.6063 33.7981 40.5811 33.7981C39.3487 33.7981 38.1163 33.492 36.9884 32.9807L36.3722 35.8398C37.6046 36.3493 38.9379 36.5546 40.1703 36.5546C43.9684 36.6554 46.3287 34.819 46.3287 32.0625C46.3287 28.5913 41.5036 28.3879 41.5036 26.8575ZM58.5429 36.4521L55.7718 23.1812H52.7953C52.1791 23.1812 51.5629 23.5899 51.3575 24.202L46.2261 36.4521H49.8188L50.5359 34.513H54.9502L55.361 36.4521H58.5429ZM53.3088 26.7546L54.334 31.7562H51.4602L53.3088 26.7546Z" fill="#172B85"/>
                                </g>
                                <defs>
                                    <filter id="filter0_d_1_6615" x="0.440945" y="0.440945" width="76.1181" height="57.1181" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset/>
                                        <feGaussianBlur stdDeviation="3.77953"/>
                                        <feComposite in2="hardAlpha" operator="out"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_6615"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_6615" result="shape"/>
                                    </filter>
                                </defs>
                            </svg>


                        </div>

                        <div>
                            <svg width="77" height="58" viewBox="0 0 77 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d_1_6616)">
                                    <rect x="9.32292" y="9.32292" width="58.3542" height="39.3542" rx="14.5521" fill="white" stroke="#D9D9D9" stroke-width="2.64583"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M52.6642 29.1125C52.6642 36.9069 46.3716 43.2256 38.6094 43.2256C30.8472 43.2256 24.5547 36.9069 24.5547 29.1125C24.5547 21.3181 30.8472 14.9995 38.6094 14.9995C46.3716 14.9995 52.6642 21.3181 52.6642 29.1125ZM41.986 23.8688C43.9411 24.5429 45.3712 25.5524 45.0907 27.431C44.8869 28.8067 44.1246 29.472 43.1118 29.705C44.5013 30.4285 44.9749 31.8017 44.5349 33.4622C43.6994 35.8517 41.7134 36.0529 39.072 35.5535L38.4306 38.1221L36.8822 37.7356L37.5148 35.2014C37.1134 35.1017 36.7031 34.9949 36.2805 34.8811L35.6453 37.4277L34.0987 37.0412L34.7392 34.4672L31.6205 33.6801L32.3898 31.9065C32.3898 31.9065 33.5314 32.2092 33.5156 32.1871C33.954 32.2957 34.149 32.0098 34.2258 31.8201L35.9638 24.8483C35.9832 24.5191 35.8694 24.1044 35.2421 23.9473C35.2659 23.9306 34.1173 23.6676 34.1173 23.6676L34.5293 22.0131L37.6524 22.787L38.2877 20.2421L39.8351 20.6286L39.2131 23.1232C39.6296 23.2176 40.0477 23.3138 40.4545 23.4152L41.072 20.9366L42.6204 21.3231L41.986 23.8688ZM38.2813 28.1143C39.336 28.3951 41.6311 29.0061 42.0311 27.4041C42.4392 25.7651 40.2095 25.27 39.1177 25.0277L39.1177 25.0277L39.1177 25.0277C38.994 25.0002 38.8849 24.976 38.7959 24.9537L38.0248 28.0474C38.0981 28.0656 38.1842 28.0885 38.2807 28.1142L38.2812 28.1143L38.2813 28.1143ZM37.0863 33.095C38.3495 33.4291 41.1124 34.1599 41.552 32.3947C42.002 30.5897 39.3232 29.9885 38.0162 29.6952L38.0161 29.6952C37.8701 29.6624 37.7412 29.6335 37.6357 29.6072L36.7852 33.0167C36.8717 33.0382 36.9729 33.065 37.0863 33.095Z" fill="#F7931A"/>
                                </g>
                                <defs>
                                    <filter id="filter0_d_1_6616" x="0.440945" y="0.440945" width="76.1181" height="57.1181" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset/>
                                        <feGaussianBlur stdDeviation="3.77953"/>
                                        <feComposite in2="hardAlpha" operator="out"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_6616"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_6616" result="shape"/>
                                    </filter>
                                </defs>
                            </svg>
                        </div>

                        <div>
                            <svg width="77" height="58" viewBox="0 0 77 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d_1_6617)">
                                    <rect x="9.32292" y="9.32292" width="58.3542" height="39.3542" rx="14.5521" fill="white" stroke="#D9D9D9" stroke-width="2.64583"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M48.0117 21.7031C47.0254 21.7031 46.2244 22.5032 46.2244 23.4896C46.2244 24.4765 47.0254 25.2749 48.0117 25.2749C48.9997 25.2749 49.8001 24.4765 49.8001 23.4896C49.8001 22.5032 48.9997 21.7031 48.0117 21.7031ZM22.2289 27.6883C21.7706 27.6587 20.7088 27.5896 20.7088 26.6352C20.7088 25.4835 22.2364 25.4835 22.8097 25.4835C23.8181 25.4835 25.1227 25.7806 26.0555 26.0596C26.0555 26.0596 26.5748 26.243 27.0168 26.4298L27.0581 26.4414V23.2868L27.0029 23.27C25.9016 22.8853 24.6231 22.5157 22.2515 22.5157C18.1629 22.5157 16.7142 24.894 16.7142 26.9334C16.7142 28.1078 17.2184 30.8742 21.8995 31.1927L21.9039 31.193C22.305 31.2175 23.3511 31.2816 23.3511 32.2644C23.3511 33.079 22.4885 33.5582 21.0381 33.5582C19.4489 33.5582 17.9061 33.1544 16.9698 32.7697V36.0177C18.372 36.3861 19.9531 36.5683 21.806 36.5683C25.8023 36.5683 27.5936 34.3177 27.5936 32.0862C27.5936 29.5571 25.5903 27.9134 22.2289 27.6883ZM34.2956 26.2862C34.3034 26.2659 34.3095 26.2498 34.314 26.2383H38.5949C38.473 26.6277 37.7091 28.9769 35.9677 31.1829C35.9677 31.1829 37.9072 34.5776 38.3504 36.4192H33.8679C33.8679 36.4192 33.3324 33.9742 32.2485 32.3497V36.4192H28.5055V23.2555L32.2485 22.5157V29.7788C33.5748 28.1764 34.1658 26.6267 34.2956 26.2862ZM56.6582 36.4192V23.1638L60.2856 22.5157V36.4192H56.6582ZM44.1536 26.1015C40.8026 26.2095 39.1001 27.7122 39.1001 30.6991V36.4199H42.7572V31.7539C42.7572 29.9663 42.9919 29.1998 45.116 29.1267V26.1543C44.7588 26.0783 44.1536 26.1015 44.1536 26.1015ZM46.1995 36.4199V26.2507H49.8264V36.4199H46.1995ZM51.3633 23.1638L54.9884 22.5157V36.4192H51.3633V23.1638Z" fill="#862165"/>
                                </g>
                                <defs>
                                    <filter id="filter0_d_1_6617" x="0.440945" y="0.440945" width="76.1181" height="57.1181" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset/>
                                        <feGaussianBlur stdDeviation="3.77953"/>
                                        <feComposite in2="hardAlpha" operator="out"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_6617"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_6617" result="shape"/>
                                    </filter>
                                </defs>
                            </svg>
                        </div>



                </div>
                <div className="SocialMedia">
                        <h3>Social Media</h3>
                        <div> <RiFacebookLine id='facebook' /></div>
                        <div><IoLogoInstagram id='insta'/></div>
                        <div><RiTwitterXFill  id='twitter'/></div>
                        <div><RiLinkedinLine id='linkedin'/></div>


                </div>
            </div>

            <div className="CopyRight">
                Ⓒ Copyright A+ Group 2025. All right reserved
            </div>
        </div>
    )
}
export default Footer
