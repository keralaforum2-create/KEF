import { ArrowLeft, X, Presentation } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollFadeUp } from "@/lib/animations";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ajilImage from "@assets/AJIL_HILITE_1766212685898.jpg";
import alfanImage from "@assets/ALFAN_1766212690930.jpg";
import jaizalImage from "@assets/JAIZAL_ALI_1766212695708.jpg";
import jishnuImage from "@assets/JISHNU_ELANCE_1766212701558.jpg";
import naseefImage from "@assets/NASEEF_NEERUTTICHALI_1766212707478.jpg";
import noureenImage from "@assets/NOUREEN_AYSHA_1766212713911.jpg";
import rameezImage from "@assets/RAMEEZ_MOIDU_1766212721141.jpg";
import rayhanImage from "@assets/RAYHAN_MYOP_1766212726903.jpg";
import shahadImage from "@assets/SHAHAD_KENZA_1766212732791.jpg";
import thajudeenImage from "@assets/THAJUDEEN_ABOOBAKER_1766212745960.jpg";
import umerImage from "@assets/UMER_ABDUSSALAM_1766212760671.jpg";
import shrikumarImage from "@assets/V_A_SHRIKUMAR_1766212766568.jpg";
import vaheedImage from "@assets/WhatsApp_Image_2025-12-21_at_10.30.12_AM_(2)_1766294013226.jpeg";
import aftharImage from "@assets/WhatsApp_Image_2025-12-21_at_10.30.12_AM_(1)_1766294013227.jpeg";
import josephImage from "@assets/WhatsApp_Image_2025-12-21_at_10.30.12_AM_1766294013228.jpeg";
import shahaderrorImage from "@assets/WhatsApp_Image_2025-12-21_at_10.30.12_AM_(4)_1766294481981.jpeg";
import ajilNewImage from "@assets/WhatsApp_Image_2025-12-21_at_10.30.12_AM_(3)_1766294481981.jpeg";
import shrikumarNewImage from "@assets/WhatsApp_Image_2025-12-21_at_10.30.11_AM_1766294481981.jpeg";
import ravhanImage from "@assets/WhatsApp_Image_2025-12-21_at_10.30.12_AM_(5)_1766294852330.jpeg";
import jishnuNewImage from "@assets/WhatsApp_Image_2025-12-21_at_10.30.12_AM_(6)_1766294852329.jpeg";
import umerNewImage from "@assets/WhatsApp_Image_2025-12-21_at_10.30.12_AM_(7)_1766294852329.jpeg";
import azharImage from "@assets/WhatsApp_Image_2025-12-21_at_10.33.49_AM_1766295827281.jpeg";
import rameesImage from "@assets/WhatsApp_Image_2025-12-21_at_10.33.49_AM_(1)_1766295827281.jpeg";
import harisImage from "@assets/WhatsApp_Image_2025-12-21_at_10.33.49_AM_(2)_1766295827280.jpeg";
import mohammedImage from "@assets/WhatsApp_Image_2025-12-21_at_10.30.12_AM_(8)_1766297240912.jpeg";
import sahalImage from "@assets/WhatsApp_Image_2025-12-21_at_10.30.12_AM_(9)_1766297240911.jpeg";
import hudaifImage from "@assets/WhatsApp_Image_2025-12-21_at_10.30.12_AM_(10)_1766297240911.jpeg";
import noureenImage2 from "@assets/WhatsApp_Image_2025-12-21_at_10.30.12_AM_(11)_1766601619600.jpeg";
import mohammedAlfanImage from "@assets/WhatsApp_Image_2025-12-21_at_10.30.12_AM_(12)_1766601619599.jpeg";
import naseefNewImage from "@assets/WhatsApp_Image_2025-12-21_at_10.30.12_AM_(13)_1766601619599.jpeg";
import thajudeenPoster from "@assets/thajudeen-poster-teal.jpeg";
import jaizalPoster from "@assets/jaizal-poster-red.jpeg";
import rameezPoster from "@assets/rameez-poster-violet.jpeg";
import faisalPoster from "@assets/faisal-poster-teal.jpeg";
import abdussaamedPoster from "@assets/abdussamed-poster-red.jpeg";
import hashimPoster from "@assets/hashim-poster-violet.jpeg";
import ramshina from "@assets/ramshina-poster-teal.jpeg";
import ajmalPoster from "@assets/ajmal-poster-red.jpeg";
import shanPoster from "@assets/shan-poster-violet.jpeg";
import aslamPoster from "@assets/aslam-poster-teal.jpeg";
import minhajPoster from "@assets/minhaj-poster-red.jpeg";
import faizalPoster from "@assets/faizal-poster-violet.jpeg";
import mathewPoster from "@assets/mathew-poster-teal.jpeg";
import orwellPoster from "@assets/orwell-poster-red.jpeg";
import amjadPoster from "@assets/amjad-poster-violet.jpeg";
import faizPoster from "@assets/faiz-poster-teal.jpeg";
import saleehPoster from "@assets/saleeh-poster-red.jpeg";
import murshidPoster from "@assets/murshid-poster-violet.jpeg";

const speakers = [
  {
    id: 1,
    image: shrikumarNewImage,
  },
  {
    id: 2,
    image: ajilNewImage,
  },
  {
    id: 3,
    image: shahaderrorImage,
  },
  {
    id: 4,
    image: ravhanImage,
  },
  {
    id: 5,
    image: jishnuNewImage,
  },
  {
    id: 6,
    image: umerNewImage,
  },
  {
    id: 7,
    image: azharImage,
  },
  {
    id: 8,
    image: rameesImage,
  },
  {
    id: 9,
    image: harisImage,
  },
  {
    id: 10,
    image: hudaifImage,
  },
  {
    id: 11,
    image: mohammedImage,
  },
  {
    id: 12,
    image: sahalImage,
  },
];

function SpeakerModal({ speaker, onClose }: { speaker: typeof speakers[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose} data-testid="modal-speaker-backdrop">
      <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} data-testid="modal-speaker">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors z-10"
          data-testid="button-close-modal"
        >
          <X className="w-6 h-6" />
        </button>
        
        <img 
          src={speaker.image} 
          alt="Speaker poster"
          className="w-full h-auto object-cover"
          data-testid={`img-speaker-${speaker.id}`}
        />
      </div>
    </div>
  );
}

export default function Speakers() {
  const { toast } = useToast();
  const [selectedSpeaker, setSelectedSpeaker] = useState<typeof speakers[0] | null>(null);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link href="/">
          <Button variant="ghost" className="mb-8" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-12">
          <ScrollFadeUp>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900" data-testid="text-speakers-title">
              Our <span className="text-red-600">Speakers</span>
            </h1>
          </ScrollFadeUp>
          <ScrollFadeUp delay={0.1}>
            <p className="text-lg text-gray-600 max-w-2xl">
              Meet the industry leaders and experts who will be sharing their insights and experiences at Kerala Startup Fest 2026.
            </p>
          </ScrollFadeUp>
        </div>


        <div className="mb-8 mt-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Featured Speakers</h2>
          <p className="text-gray-600">Our accomplished industry leaders and experts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((speaker, index) => (
            <ScrollFadeUp key={speaker.id} delay={index * 0.05}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md"
                onClick={() => setSelectedSpeaker(speaker)}
                data-testid={`card-speaker-${speaker.id}`}
              >
                <img 
                  src={speaker.image} 
                  alt="Speaker poster"
                  className="w-full h-auto object-cover"
                  data-testid={`img-speaker-thumbnail-${speaker.id}`}
                />
              </div>
            </ScrollFadeUp>
          ))}
        </div>

        {/* Featured Speakers Grid */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Teal Speaker */}
            <ScrollFadeUp delay={0.1}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-teal-500"
                onClick={() => {
                  const featuredSpeaker = { id: 13, image: vaheedImage };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-vaheed"
              >
                <img 
                  src={vaheedImage} 
                  alt="M Vaheed Ali"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-vaheed"
                />
              </div>
            </ScrollFadeUp>

            {/* Red Speaker */}
            <ScrollFadeUp delay={0.15}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-red-500"
                onClick={() => {
                  const featuredSpeaker = { id: 14, image: aftharImage };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-afthar"
              >
                <img 
                  src={aftharImage} 
                  alt="Afthar Rahman"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-afthar"
                />
              </div>
            </ScrollFadeUp>

            {/* Violet Speaker */}
            <ScrollFadeUp delay={0.2}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-violet-500"
                onClick={() => {
                  const featuredSpeaker = { id: 15, image: josephImage };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-joseph"
              >
                <img 
                  src={josephImage} 
                  alt="Joseph Sunny"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-joseph"
                />
              </div>
            </ScrollFadeUp>
          </div>
        </div>

        {/* Additional Featured Speakers Grid */}
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Teal Speaker - Noureen */}
            <ScrollFadeUp delay={0.1}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-teal-500"
                onClick={() => {
                  const featuredSpeaker = { id: 16, image: noureenImage2 };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-noureen"
              >
                <img 
                  src={noureenImage2} 
                  alt="Noureen Aysha"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-noureen"
                />
              </div>
            </ScrollFadeUp>

            {/* Red Speaker - Mohammed Alfan */}
            <ScrollFadeUp delay={0.15}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-red-500"
                onClick={() => {
                  const featuredSpeaker = { id: 17, image: mohammedAlfanImage };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-alfan"
              >
                <img 
                  src={mohammedAlfanImage} 
                  alt="Mohammed Alfan"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-alfan"
                />
              </div>
            </ScrollFadeUp>

            {/* Violet Speaker - Naseef */}
            <ScrollFadeUp delay={0.2}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-violet-500"
                onClick={() => {
                  const featuredSpeaker = { id: 18, image: naseefNewImage };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-naseef"
              >
                <img 
                  src={naseefNewImage} 
                  alt="Naseef Neeruttichali"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-naseef"
                />
              </div>
            </ScrollFadeUp>
          </div>
        </div>

        {/* Third Featured Speakers Grid */}
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Teal Speaker - Thajudeen */}
            <ScrollFadeUp delay={0.1}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-teal-500"
                onClick={() => {
                  const featuredSpeaker = { id: 19, image: thajudeenPoster };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-thajudeen"
              >
                <img 
                  src={thajudeenPoster} 
                  alt="Thajudeen Aboobaker"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-thajudeen"
                />
              </div>
            </ScrollFadeUp>

            {/* Red Speaker - Jaizal */}
            <ScrollFadeUp delay={0.15}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-red-500"
                onClick={() => {
                  const featuredSpeaker = { id: 20, image: jaizalPoster };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-jaizal"
              >
                <img 
                  src={jaizalPoster} 
                  alt="Jaizal Ali"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-jaizal"
                />
              </div>
            </ScrollFadeUp>

            {/* Violet Speaker - Rameez */}
            <ScrollFadeUp delay={0.2}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-violet-500"
                onClick={() => {
                  const featuredSpeaker = { id: 21, image: rameezPoster };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-rameez"
              >
                <img 
                  src={rameezPoster} 
                  alt="Rameez Moidu"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-rameez"
                />
              </div>
            </ScrollFadeUp>
          </div>
        </div>

        {/* Fourth Featured Speakers Grid */}
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Teal Speaker - Faisal P Seyid */}
            <ScrollFadeUp delay={0.1}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-teal-500"
                onClick={() => {
                  const featuredSpeaker = { id: 22, image: faisalPoster };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-faisal"
              >
                <img 
                  src={faisalPoster} 
                  alt="Faisal P Seyid"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-faisal"
                />
              </div>
            </ScrollFadeUp>

            {/* Red Speaker - Abdussamed Kari */}
            <ScrollFadeUp delay={0.15}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-red-500"
                onClick={() => {
                  const featuredSpeaker = { id: 23, image: abdussaamedPoster };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-abdussamed"
              >
                <img 
                  src={abdussaamedPoster} 
                  alt="Abdussamed Kari"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-abdussamed"
                />
              </div>
            </ScrollFadeUp>

            {/* Violet Speaker - Adv Hashim Wafa */}
            <ScrollFadeUp delay={0.2}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-violet-500"
                onClick={() => {
                  const featuredSpeaker = { id: 24, image: hashimPoster };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-hashim"
              >
                <img 
                  src={hashimPoster} 
                  alt="Adv Hashim Wafa"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-hashim"
                />
              </div>
            </ScrollFadeUp>
          </div>
        </div>

        {/* Fifth Featured Speakers Grid */}
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Teal Speaker - Ramshina */}
            <ScrollFadeUp delay={0.1}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-teal-500"
                onClick={() => {
                  const featuredSpeaker = { id: 25, image: ramshina };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-ramshina"
              >
                <img 
                  src={ramshina} 
                  alt="Ramshina Mahamood"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-ramshina"
                />
              </div>
            </ScrollFadeUp>

            {/* Red Speaker - Ajmal */}
            <ScrollFadeUp delay={0.15}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-red-500"
                onClick={() => {
                  const featuredSpeaker = { id: 26, image: ajmalPoster };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-ajmal"
              >
                <img 
                  src={ajmalPoster} 
                  alt="CA Ajmal Muhajir"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-ajmal"
                />
              </div>
            </ScrollFadeUp>

            {/* Violet Speaker - Shan */}
            <ScrollFadeUp delay={0.2}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-violet-500"
                onClick={() => {
                  const featuredSpeaker = { id: 27, image: shanPoster };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-shan"
              >
                <img 
                  src={shanPoster} 
                  alt="Shan Abdul Salam"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-shan"
                />
              </div>
            </ScrollFadeUp>
          </div>
        </div>

        {/* Sixth Featured Speakers Grid */}
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Teal Speaker - Aslam Abbas */}
            <ScrollFadeUp delay={0.1}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-teal-500"
                onClick={() => {
                  const featuredSpeaker = { id: 28, image: aslamPoster };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-aslam"
              >
                <img 
                  src={aslamPoster} 
                  alt="Aslam Abbas"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-aslam"
                />
              </div>
            </ScrollFadeUp>

            {/* Red Speaker - Minhaj Muhammed */}
            <ScrollFadeUp delay={0.15}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-red-500"
                onClick={() => {
                  const featuredSpeaker = { id: 29, image: minhajPoster };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-minhaj"
              >
                <img 
                  src={minhajPoster} 
                  alt="Minhaj Muhammed"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-minhaj"
                />
              </div>
            </ScrollFadeUp>

            {/* Violet Speaker - Faizal CP */}
            <ScrollFadeUp delay={0.2}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-violet-500"
                onClick={() => {
                  const featuredSpeaker = { id: 30, image: faizalPoster };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-faizal-cp"
              >
                <img 
                  src={faizalPoster} 
                  alt="Faizal CP"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-faizal-cp"
                />
              </div>
            </ScrollFadeUp>
          </div>
        </div>

        {/* Seventh Featured Speakers Grid */}
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Teal Speaker - Mathew Joseph */}
            <ScrollFadeUp delay={0.1}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-teal-500"
                onClick={() => {
                  const featuredSpeaker = { id: 31, image: mathewPoster };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-mathew"
              >
                <img 
                  src={mathewPoster} 
                  alt="Mathew Joseph"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-mathew"
                />
              </div>
            </ScrollFadeUp>

            {/* Red Speaker - Orwell Lionel */}
            <ScrollFadeUp delay={0.15}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-red-500"
                onClick={() => {
                  const featuredSpeaker = { id: 32, image: orwellPoster };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-orwell"
              >
                <img 
                  src={orwellPoster} 
                  alt="Orwell Lionel"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-orwell"
                />
              </div>
            </ScrollFadeUp>

            {/* Violet Speaker - Dr Amjad Wafaa */}
            <ScrollFadeUp delay={0.2}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-violet-500"
                onClick={() => {
                  const featuredSpeaker = { id: 33, image: amjadPoster };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-amjad"
              >
                <img 
                  src={amjadPoster} 
                  alt="Dr Amjad Wafaa"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-amjad"
                />
              </div>
            </ScrollFadeUp>
          </div>
        </div>

        {/* Eighth Featured Speakers Grid */}
        <div className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Teal Speaker - Faiz Narkashi */}
            <ScrollFadeUp delay={0.1}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-teal-500"
                onClick={() => {
                  const featuredSpeaker = { id: 34, image: faizPoster };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-faiz-narkashi"
              >
                <img 
                  src={faizPoster} 
                  alt="Faiz Narkashi"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-faiz-narkashi"
                />
              </div>
            </ScrollFadeUp>

            {/* Red Speaker - Saleeh K */}
            <ScrollFadeUp delay={0.15}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-red-500"
                onClick={() => {
                  const featuredSpeaker = { id: 35, image: saleehPoster };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-saleeh"
              >
                <img 
                  src={saleehPoster} 
                  alt="Saleeh K"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-saleeh"
                />
              </div>
            </ScrollFadeUp>

            {/* Violet Speaker - Murshid Basheer */}
            <ScrollFadeUp delay={0.2}>
              <div 
                className="cursor-pointer hover-elevate transition-all overflow-hidden rounded-md bg-violet-500"
                onClick={() => {
                  const featuredSpeaker = { id: 36, image: murshidPoster };
                  setSelectedSpeaker(featuredSpeaker as any);
                }}
                data-testid="card-featured-speaker-murshid"
              >
                <img 
                  src={murshidPoster} 
                  alt="Murshid Basheer"
                  className="w-full h-auto object-cover"
                  data-testid="img-featured-speaker-murshid"
                />
              </div>
            </ScrollFadeUp>
          </div>
        </div>

        {/* Be a Speaker Section */}
        <div className="mt-20 pt-16 border-t border-gray-200">
          <ScrollFadeUp>
            <Card className="bg-red-600 text-white p-8 rounded-lg">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Presentation className="w-6 h-6" />
                    <h3 className="text-2xl sm:text-3xl font-bold">Be a Live Podcast Speaker at KSF Venue</h3>
                  </div>
                </div>
                <Link href="/participate" onClick={(e) => {
                  e.preventDefault();
                  toast({
                    title: "Registration Closed",
                    description: "Podcast speaker registrations are currently closed.",
                    variant: "destructive"
                  });
                }}>
                  <Button 
                    variant="default" 
                    className="bg-white text-red-600 hover:bg-gray-100 whitespace-nowrap"
                    data-testid="button-register-speaker"
                  >
                    Register Now
                  </Button>
                </Link>
              </div>
            </Card>
          </ScrollFadeUp>
        </div>
      </div>

      {selectedSpeaker && (
        <SpeakerModal 
          speaker={selectedSpeaker} 
          onClose={() => setSelectedSpeaker(null)}
        />
      )}
    </div>
  );
}
