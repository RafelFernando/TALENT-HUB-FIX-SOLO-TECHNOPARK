import Bahasa from "./CV/Bahasa.jsx";
import Biodata from "./CV/Biodata.jsx";
import FileCv from "./CV/FileCv.jsx";
import PengalamanKerja from "./CV/PengalamanKerja.jsx";
import SkillKeahlian from "./CV/SkillKeahlian.jsx";
import TentangSaya from "./CV/TentangSaya.jsx";
import LinkPortofolio from './CV/LinkPortofolio';

export default function CvSeeker() {
    return (
        <>
            <div>
                <h1 className="text-2xl font-semibold text-gray-700">Curiculum Vitae</h1>
            </div>
           <hr className="my-6 border-t-2 border-gray-200 rounded-full" />

            <div className="flex gap-6">
                <div className="flex-[1.3]"><Biodata /></div>
                <div className="flex-[0.7]"><FileCv /></div>
            </div>

            <div className="flex gap-6">
                <div className="flex-[1.3]">
                    <PengalamanKerja/>
                    <LinkPortofolio/>
                    </div>
                <div className="flex-[0.7]">
                    <TentangSaya />
                    <SkillKeahlian />
                    <Bahasa />
                </div>
            </div>
            
        </>
    );
}