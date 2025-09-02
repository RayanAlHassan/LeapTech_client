// categoryImages.ts
import seo from "@/public/images/seo.png";
import web from "@/public/images/website.png";
import sm from "@/public/images/eBusiness.png";
import app from "@/public/images/mobileApps.png";
import sh from "@/public/images/smartHomeBlue.png";
import cs from "@/public/images/cloud.png";
import ft from "@/public/images/fintech.png"

import { StaticImageData } from "next/image";

const categoryImages: Record<string, StaticImageData> = {
    "web development": web,
    "e-business": sm,
    "mobile application": app,
    "digital marketing": seo,
    "smart home": sh,
    "cloud storage": cs,
    "fintech":ft
  };
  
  

export default categoryImages;
