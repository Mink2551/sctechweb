"use client"

import { useEffect } from 'react';
import Image from 'next/image';
import SC_Logo from "../../../public/logo_sc.png";
import Link from 'next/link';
import data from "../Contents/data"

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
        <div className="max-w-7xl mx-auto grid mb-96">

            {/* Header */}
            <div className="grid ml-3 ">
                <div className='md:mb-60 mb-10'>
                    <div className="text-5xl mt-48 flex w-fit text-gray-800 font-bold">
                        <p>TECHNICIAN</p>
                    </div>
                    <div className="font-bold ml-2 w-fit text-gray-700 text-4xl">
                        Department
                    </div>
                    <div className="">
                        <div className="font-bold ml-2 max-w-[500px] text-gray-700 m-10 text-xl">
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
            </div>
            
            {/* วัผลลัพธ์การเรียนรู้ */}
            <div className="grid ml-5">
                <h4 className="font-bold text-3xl text-gray-700">ผลลัพธ์การเรียนรู้</h4>
                <p className="text-xl ml-3 mt-3 md:w-[75%] w-[90%] font-semibold text-gray-600" dangerouslySetInnerHTML={{ __html: data.data1 }}></p>
            </div>

            {/* วัตถุประสงค์ของหลักสูตร */}
            <div className="grid ml-5 mt-24">
                <h4 className="font-bold text-3xl max-w-[90%] text-gray-700">วัตถุประสงค์ของหลักสูตร</h4>
                <div className="text-xl ml-3 mt-3 gap-y-5 grid md:w-[75%] w-[90%] font-semibold text-gray-600">
                    <li>สามารถเข้าใจหลักองค์ประกอบของภาพดิจิทัล ขนาดและอัตราส่วนของภาพดิจิทัล หลักการของภาพนิ่งและภาพเคลื่อนไหวได้</li>
                    <li>สามารถปรับแต่งสี <span className="text-blue-500">( Color Correction )</span> ความมืด – สว่าง <span className="text-blue-500">( Brightness )</span> รวมทั้งรายละเอียดอื่น ๆ ของรูปภาพให้มีความเป็นกลาง <span className="text-blue-500">( Neutral )</span> และเหมาะสมได้</li>
                    <li>สามารถประยุกต์ใช้ความรู้ทางทฤษฎี วิเคราะห์บริบทและสภาพแวดล้อมของรูปภาพ ตลอดจนหลักจริยธรรมและจรรยาบรรณการผลิตสื่อในการพิจารณาและคัดเลือกรูปภาพที่เหมาะสมได้</li>
                    <li>สามารถประยุกต์นำภาพนิ่ง ภาพเคลื่อนไหว ดนตรีและเสียง องค์ประกอบศิลป์ และองค์ปะกอบอื่น ๆ ในการผลิตสื่อประสมได้</li>
                    <li>สามารถเลือกใช้เครื่องมือและเทคโนโลยีที่เหมาะสมในการผลิตสื่อได้</li>
                    <li>มีทักษะในการค้นคว้าความรู้ใหม่ด้วยตนเอง และนำเสนอความคิดริเริ่มใหม่ ๆ เพื่อปรับปรุงพัฒนางานให้ดีขึ้น</li>
                    <li>สามารถสื่อสารกับผู้อื่นอย่างมีเหตุผล และทำงานร่วมกันเป็นทีมได</li>
                    <li>มีความรับผิดชอบต่อตนเองและสังคม</li>
                </div>
            </div>

            {/* Facebook page */}
            <div className='grid '>
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

            {/* หัวข้อการเรียนรู้ตามหลักสูตร */}
            <div className="ml-3">
                <h3 className="font-bold text-3xl text-gray-700 mt-24">หัวข้อการเรียนรู้ตามหลักสูตร</h3>
                <div className="text-2xl ml-5 mt-3 gap-y-5 grid md:w-[75%] w-[90%] font-semibold text-gray-600">
                    <h4 className="font-bold mt-10">สามารถคัดเลือกและปรับแต่งรูปภาพในงานและกิจกรรมต่าง ๆ ของชุมนุมได</h4>
                    <div className="ml-5 text-xl gap-y-5 grid md:w-[75%] w-[90%]">
                        <li>สามารถใช้งานโปรแกรม <span className="text-blue-500">Adobe Lightroom</span> ในการจัดการ คัดเลือก และปรับแต่งรูปภาพได้</li>
                        <li>สามารถพิจารณาและคัดเลือกรูปภาพที่ไม่เหมาะสมออกจากรูปภาพทั้งหมดได้</li>
                        <li>สามารถปรับแต่งความมืด - สว่างโดยรวมของรูปภาพให้เหมาะสมได้</li>
                        <li>สามารถปรับแต่งสีของรูปภาพให้มีความเป็นกลาง (Neutral) และเหมาะสมได้</li>
                        <li>สามารถนำบริบทของรูปภาพ (Context) มาประกอบการคัดเลือกรูปภาพให้เหมาะสมได้</li>
                    </div>
                    <h4 className="font-bold mt-10">สามารถตัดต่อคลิปวิดีโอการสัมภาษณ์ และคลิปวิดีโออื่น ๆ ในงานและกิจกรรมของชุมนุมได้</h4>
                    <div className="ml-5 text-xl gap-y-5 grid md:w-[75%] w-[90%]">
                        <li>สามารถใช้งานโปรแกรม <span className="text-blue-500">Adobe Premiere Pro</span> หรือโปรแกรมอื่น ๆ ที่เกี่ยวข้อง ในการตัดต่อวิดีโอให้เป็นชิ้นงานอย่างง่าย ๆ ได้</li>
                        <li>สามารถรวมและตัดต่อวิดีโอ ภาพ เสียง และกราฟฟิกต่าง ๆ ลงบนชิ้นงานได้</li>
                        <li>สามารถใส่ <span className="text-blue-500">Sound Effects</span> เพลงประกอบ <span className="text-blue-500">(BGM)</span> หรือพากย์เสียงทับ <span className="text-blue-500">(Voiceover)</span> ลงบนชิ้นงานได้</li>
                        <li>สามารถใช้งาน <span className="text-blue-500">Effects</span> และ <span className="text-blue-500">Transition</span> ต่าง ๆ ลงบนชิ้นงานได้</li>
                        <li>สามารถใส่ <span className="text-blue-500">Green Screen</span> ลงบนชิ้นงานได้ รวมทั้งสร้าง <span className="text-blue-500">Green Screen</span> ขึ้นสำหรับใช้งานเองได้</li>
                        <li>สามารถใส่ <span className="text-blue-500">End Credit</span> ลงบนชิ้นงานได้</li>
                    </div>
                </div>
            </div>

            {/* รูปแบบการจัดการเรียนการสอน */}
            <div className="grid ml-5 mt-24">
                <h4 className="font-bold text-3xl text-gray-700">รูปแบบการจัดการเรียนการสอน</h4>
                <div className="text-xl ml-3 mt-3 gap-y-5 grid md:w-[75%] w-[90%] font-semibold text-gray-600">
                    <li>เรียนรู้ภาคทฤษฎี</li>
                    <li>เรียนรู้ภาคปฏิบัติ ผ่านโปรแกรม <span className="text-blue-500">Adobe Lightroom, Adobe Premiere Pro</span> หรือโปรแกรมอื่น ๆ ที่เกี่ยวข้อง</li>
                </div>
            </div>

            {/* สถานที่จัดการจัดการเรียนการสอน */}
            <div className="grid ml-5 mt-24">
                <h4 className="font-bold text-3xl text-gray-700">สถานที่จัดการจัดการเรียนการสอน</h4>
                <div className="text-xl ml-3 mt-3 gap-y-5 grid md:w-[75%] w-[90%] font-semibold text-gray-600">
                    <li>ในเวลาเรียน ผ่านกิจกรรมชุมนุม</li>
                    <li>นอกเวลาเรียน ผ่านกิจกรรม Workshop และการเรียนรู้ด้วยตนเองผ่านสื่อการสอนใน Google Classroom</li>
                </div>
            </div>

            {/*  */}
            <div>
               <h4 className="font-bold text-3xl ml-3 mt-24 text-gray-700">ตารางจัดการเรียนการสอนรายสัปดาห์</h4>
               <Link href="/carlendar"><button className="bg-blue-600 text-white px-3 py-1 rounded-xl text-xl font-bold ml-3 mt-4 hover:text-gray-200 hover:bg-blue-700">Carlendar</button></Link>
            </div>
            

                {/* Question */}
                {/* <div className='mt-32 ml-4 w-fit'>
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
                </div> */}
            </div>
        </div>
    );
}

export default HomeBody;
