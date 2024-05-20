"use client"

import { useEffect } from 'react';
import Image from 'next/image';
import SC_Logo from "../../../public/logo_sc.png";
import Link from 'next/link';

const HomeBody = ({ session }) => {
    useEffect(() => {
        // Load Facebook SDK
        const loadFacebookSDK = () => {
            const script = document.createElement('script');
            script.src = "https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v19.0";
            script.async = true;
            script.defer = true;
            script.crossOrigin = "anonymous";
            script.nonce = "LZNdlrRD";
            document.getElementById('fb-root').appendChild(script);
        }
        loadFacebookSDK();

        // Adjust Facebook plugin width on window resize
        const adjustFacebookPluginWidth = () => {
            const fbPlugin = document.getElementById('facebook-plugin');
            if (window.innerWidth < 1200) {
                fbPlugin.setAttribute('data-width', '340');
            } else {
                fbPlugin.setAttribute('data-width', '400');
            }
            // Re-parse the Facebook plugin to apply changes
            if (window.FB) {
                window.FB.XFBML.parse();
            }
        }

        // Initial adjustment
        adjustFacebookPluginWidth();
        // Adjust on resize
        window.addEventListener('resize', adjustFacebookPluginWidth);

        return () => {
            window.removeEventListener('resize', adjustFacebookPluginWidth);
        }
    }, []);

    return (
        <div className="max-w-7xl mx-auto grid">

            {/* Header */}
            <div className="grid ml-3 w-fit md:grid-cols-[1fr,1fr]">
                <div className='md:mb-60 mb-10'>
                    <div className="text-5xl mt-48 flex w-fit text-gray-800 font-bold">
                        <p>TECHNICIAN</p>
                    </div>
                    <div className="font-bold ml-2 w-fit text-gray-700 text-4xl">
                        Department
                    </div>
                    <div className="">
                        <div className="font-bold ml-2 text-gray-700 m-10 text-xl">
                            เว็บทำงาน ตารางการสอน ของชุมนุม SC หรือ ชุมนุมสื่อสารมวลชน ฝ่ายเทคนิค Enjoy na
                        </div>
                        {!session ? (
                            <div className="font-bold ml-3 text-white bg-red-500 shadow-2xl h-fit w-fit px-5 py-2 rounded-2xl m-10 text-4xl">
                                <span className="animate-pulse">Hello User</span>
                            </div>
                        ) : (
                            <>
                                <div className="font-bold ml-3 text-white bg-red-500 shadow-2xl h-fit w-fit px-5 py-2 rounded-2xl m-10 text-4xl">
                                    <span className="animate-pulse">Hello {session?.user?.name}</span>
                                </div>
                                <ul>
                                    <li className='font-bold underline text-blue-600 hover:text-blue-700 cursor-pointer h-fit w-fit px-5 py-2 rounded-2xl text-md animate-bounce'>
                                        <Link href="/package">Download Package</Link>
                                    </li>
                                </ul>
                            </>
                        )}
                    </div>
                </div>
                <div></div>
            </div>

            {/* Facebook page */}
            <div className='grid md:grid-cols-[1fr,1fr]'>
                <div>
                    {/* Facebook Page Plugin */}
                    <div id="fb-root"></div>
                    <div id="facebook-plugin" className="fb-page rounded-2xl mt-32 mx-4 pb-10 flex"
                        data-href="https://www.facebook.com/sc.satitpm.official?locale=th_TH"
                        data-tabs="timeline"
                        data-width="400"
                        data-height="450"
                        data-small-header="false"
                        data-adapt-container-width="true"
                        data-hide-cover="false"
                        data-show-facepile="true">
                        <blockquote cite="https://www.facebook.com/sc.satitpm.official?locale=th_TH" className="fb-xfbml-parse-ignore">
                            <a href="https://www.facebook.com/sc.satitpm.official?locale=th_TH">ชุมนุมสื่อสารมวลชน สาธิตฯพระนคร</a>
                        </blockquote>
                    </div>
                </div>

                {/* Question */}
                <div className='mt-32 ml-4 w-fit'>
                    <div className="text-5xl flex text-gray-800 justify-center font-bold">
                        <p>แบบสอบถาม</p>
                    </div>
                    <div className="font-bold text-gray-700 justify-center grid mt-5 text-xl">
                        <span className='flex justify-center'>วัดระดับความรู้ในฝ่ายเทคนิค</span>
                        <span className='justify-center flex mt-3'>Technical department</span>
                        <iframe className="mb-10 md:w-340"
                            src="https://docs.google.com/forms/d/e/1FAIpQLSeCLbJpgw5sCIjotTuA0jCDkKuwt2eydlBIb-aik0VDGL6t2g/viewform?embedded=true"
                            width="360"
                            height="320"
                            frameBorder="0"
                            marginHeight="0"
                            marginWidth="0">
                            กำลังโหลด…
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeBody;
