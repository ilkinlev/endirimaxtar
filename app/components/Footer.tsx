"use client";

import { useState } from "react";

export default function Footer() {
  const [showLegal, setShowLegal] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Trust Statement */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Müstəqil qiymət müqayisə platforması. Rəsmi mağaza deyil.
          </p>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
          <button
            onClick={() => setShowLegal(!showLegal)}
            className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Hüquqi Məlumat
          </button>
          <button
            onClick={() => setShowContact(!showContact)}
            className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Əlaqə
          </button>
        </div>

        {/* Legal Information Popup */}
        {showLegal && (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-6 text-sm space-y-4">
            <h3 className="font-bold text-lg dark:text-white mb-4">
              Hüquqi Məlumat
            </h3>

            <div className="space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                <strong>Platformanın Məqsədi:</strong> EndirimAxtar müştərilərə
                müxtəlif marketlərdəki qiymətləri müqayisə etməyə kömək edən
                müstəqil məlumat platformasıdır.
              </p>

              <p>
                <strong>Qanuni Uyğunluq:</strong> EndirimAxtar tətbiq olunan
                qanunlara uyğun fəaliyyət göstərməyə çalışır və açıq mənbəli
                məlumatlardan istifadə edir.
              </p>

              <p>
                <strong>Ticarət Nişanları:</strong> Market adları və məhsul
                adları yalnız məlumat məqsədilə istifadə olunur. Bütün ticarət
                nişanları və brend adları müvafiq sahiblərinə məxsusdur.
              </p>

              <p>
                <strong>Qiymət Dəqiqliyi:</strong> Saytımızda göstərilən
                qiymətlər yalnız məlumat xarakteri daşıyır. Ən dəqiq və aktual
                qiymət məlumatı üçün alış-veriş zamanı müvafiq marketin rəsmi
                mağazası və ya veb-saytına müraciət edilməlidir. Qiymətlər və
                endirimlər bildiriş verilmədən dəyişilə bilər.
              </p>

              <p>
                <strong>Məsuliyyət Məhdudiyyəti:</strong> EndirimAxtar heç bir
                market və ya brendlə rəsmi əlaqəsi olmayan müstəqil
                platformadır. Biz məhsulların satışı və ya çatdırılması ilə
                məşğul olmur, yalnız qiymət məlumatı təqdim edirik.
              </p>

              <p>
                <strong>Məlumat Mənbələri:</strong> Qiymət məlumatları açıq
                şəkildə əlçatan reklam materiallarından, marketlərin
                saytlarından və istifadəçi töhfələrindən toplanır.
              </p>
            </div>

            <button
              onClick={() => setShowLegal(false)}
              className="mt-4 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Bağla
            </button>
          </div>
        )}

        {/* Contact Information Popup */}
        {showContact && (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-6 text-sm">
            <h3 className="font-bold text-lg dark:text-white mb-4">Əlaqə</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <a
                    href="mailto:endirimaxtar@gmail.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    endirimaxtar@gmail.com
                  </a>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Suallarınız, təklifləriniz və ya əməkdaşlıq üçün bizimlə əlaqə
                saxlayın.
              </p>
            </div>

            <button
              onClick={() => setShowContact(false)}
              className="mt-4 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Bağla
            </button>
          </div>
        )}

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          <p>© 2025 EndirimAxtar. Bütün hüquqlar qorunur.</p>
          <p className="mt-1">
            Son yenilənmə: {new Date().toLocaleDateString("az-AZ")}
          </p>
        </div>
      </div>
    </footer>
  );
}
