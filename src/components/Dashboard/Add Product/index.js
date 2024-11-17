import { RenderSteps } from "./RenderSteps"
import TIP from '../../../assets/tip_image.png'
import { useTranslation } from "react-i18next"

export default function AddProduct() {
  const { t } = useTranslation();
  return (
    <>
      <p className="p-3 text-2xl">{t("Home/Dashboard/Add Products")}</p>
      <div className="flex w-full items-start gap-x-8">
        <div className="mt-14 flex flex-1 flex-col">
          <h1 className="mb-10 p-3 text-3xl font-medium">
            {t("Add Product Details")}
          </h1>
          <div className="flex-1">
            <RenderSteps />
          </div>
        </div>

        {/* Product Info Tips */}
        <div className="sticky top-10 hidden max-w-[350px] flex-1 rounded-md border-[1px] border-richblack-700 shadow-2xl p-6 mr-10 xl:block">
          <p className="mb-8 text-lg flex items-center text-richblack-5">
            <img src={TIP} alt="" height={49} width={47} />
            {t("Image upload Tips")}</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
            <li>{t("Set the Course Price option or make it free.")}</li>
            <li>{t("Standard size for the course thumbnail is 1024x576.")}</li>
            <li>{t("Video section controls the course overview video.")}</li>
            <li>{t("Course Builder is where you create & organize a course.")}</li>
            <li>
              {t("Add Topics in the Course Builder section to create lessons,")}
              {t("quizzes, and assignments.")}
            </li>
            <li>
              {t("Information from the Additional Data section shows up on the")}
              {t("course single page.")}
            </li>
            <li>{t("Make Announcements to notify any important")}</li>
            <li>{t("Notes to all Users Logins at once.")}</li>
          </ul>
        </div>
      </div>
    </>
  )
}