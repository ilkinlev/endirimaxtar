"use client";

import Header from "../components/Header";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Ana səhifəyə qayıt
        </Link>

        {/* IMPORTANT NOTICE AT TOP */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-500 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <span className="text-3xl mr-4">⚠️</span>
            <div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">
                Vacib Məlumat
              </h3>
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                <strong>EndirimAxtar</strong> heç bir market və ya şirkətlə
                əlaqəli deyil. Biz tamamilə{" "}
                <strong>müstəqil platformayıq</strong>. Heç bir marketdən
                maliyyə dəstəyi almırıq və heç bir marketlə reklam müqaviləmiz
                yoxdur. Məqsədimiz yalnız istehlakçılara obyektiv qiymət
                məlumatı verməkdir.
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-4 dark:text-white">
            <span className="text-red-500">Endirim</span>
            <span className="dark:text-white">Axtar</span> Haqqında
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Bakı şəhərindəki marketlərdə ən yaxşı qiymətləri tapmağa kömək edən
            platformamız
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 dark:text-white flex items-center">
            <span className="text-3xl mr-3">🎯</span>
            Missiyamız
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            <strong>EndirimAxtar</strong> platforması Bakı şəhərində yaşayan
            insanlara marketlərdə ən sərfəli qiymətləri tapmaqda kömək etmək
            üçün yaradılmışdır. Biz inanırıq ki, hər kəs öz pul vəsaitini ağıllı
            şəkildə xərcləmək hüququna malikdir.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Məqsədimiz sizin vaxtınıza qənaət etmək və müxtəlif marketlərin
            qiymətlərini müqayisə etməklə ən yaxşı təklifləri tapmağınıza kömək
            etməkdir.
          </p>
        </div>

        {/* How It Works */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 dark:text-white flex items-center">
            <span className="text-3xl mr-3">🔍</span>
            Necə İşləyir?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-2xl mr-3">1️⃣</span>
              <div>
                <h3 className="font-bold dark:text-white mb-1">Məhsul Axtar</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Axtarış panelində istədiyiniz məhsulun adını yazın
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">2️⃣</span>
              <div>
                <h3 className="font-bold dark:text-white mb-1">
                  Qiymətləri Müqayisə Edin
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Müxtəlif marketlərdəki qiymətləri bir yerdə görün
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">3️⃣</span>
              <div>
                <h3 className="font-bold dark:text-white mb-1">Qənaət Edin</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Ən ucuz qiyməti tapın və pul qənaət edin
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Notice */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-lg p-8 mb-6 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold mb-4 dark:text-white flex items-center">
            <span className="text-3xl mr-3">⚖️</span>
            Qanuni Məlumat
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              <strong>EndirimAxtar</strong> platforması tamamilə qanunidir və
              heç bir qanun pozuntusu etmir.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Biz marketlərin <strong>açıq şəkildə yayımladığı</strong> qiymət
                məlumatlarını toplayırıq
              </li>
              <li>Heç bir məxfi və ya qorunan məlumata müdaxilə etmirik</li>
              <li>
                Sadəcə <strong>ictimai məlumatları</strong> bir yerdə təqdim
                edirik
              </li>
              <li>İstehlakçıların qərar qəbul etməsinə kömək edirik</li>
              <li>Marketlərin rəqabət qabiliyyətini artırırıq</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Platformamız <strong>qiymət şəffaflığını</strong> təşviq edir və
              istehlakçı hüquqlarını dəstəkləyir. Bu, dünya miqyasında qəbul
              edilmiş bir praktikadır.
            </p>
          </div>
        </div>

        {/* Independence Notice */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg shadow-lg p-8 mb-6 border-l-4 border-green-500">
          <h2 className="text-2xl font-bold mb-4 dark:text-white flex items-center">
            <span className="text-3xl mr-3">🤝</span>
            Müstəqillik Bəyanatı
          </h2>
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed font-semibold text-lg">
              <strong>EndirimAxtar</strong> heç bir market və ya şirkətlə
              əlaqəli deyil.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Biz <strong>tamamilə müstəqil</strong> platformayıq
              </li>
              <li>Heç bir marketdən maliyyə dəstəyi almırıq</li>
              <li>
                Heç bir marketlə reklam və ya tərəfdaşlıq müqaviləmiz yoxdur
              </li>
              <li>
                Bütün qiymət məlumatları <strong>obyektiv</strong> və{" "}
                <strong>qərəzsiz</strong> şəkildə təqdim olunur
              </li>
              <li>Heç bir marketi digərinə üstün tutmuruq</li>
              <li>
                Məqsədimiz yalnız istehlakçılara <strong>dürüst məlumat</strong>{" "}
                verməkdir
              </li>
            </ul>
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
              <p className="leading-relaxed text-sm">
                <strong>Qeyd:</strong> Qiymətlər marketlərin öz veb saytlarından
                və ya mağazalarından toplanır. Qiymət dəyişiklikləri mümkündür.
                Ən dəqiq qiymət üçün marketin özünə müraciət edin.
              </p>
            </div>
          </div>
        </div>

        {/* Stores We Cover */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 dark:text-white flex items-center">
            <span className="text-3xl mr-3">🏪</span>
            Əhatə Etdiyimiz Marketlər
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="font-bold text-lg dark:text-white">Bravo</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="font-bold text-lg dark:text-white">BazarStore</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="font-bold text-lg dark:text-white">Oba</p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="font-bold text-lg dark:text-white">Al Market</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
            Və tezliklə daha çox market əlavə ediləcək...
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 dark:text-white flex items-center">
            <span className="text-3xl mr-3">✨</span>
            Üstünlüklərimiz
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">💰</span>
              <div>
                <h3 className="font-bold dark:text-white">Pul Qənaəti</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ən ucuz qiymətləri tapın
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">⏱️</span>
              <div>
                <h3 className="font-bold dark:text-white">Vaxt Qənaəti</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Bir yerdə bütün qiymətlər
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">📊</span>
              <div>
                <h3 className="font-bold dark:text-white">Asan Müqayisə</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sürətli qiymət müqayisəsi
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-bold dark:text-white">
                  Endirimləri Qaçırmayın
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Aktual endirim məlumatları
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-linear-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Bizimlə Əlaqə</h2>
          <p className="mb-6">
            Sualınız və ya təklifiniz var? Bizimlə əlaqə saxlayın!
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Ana Səhifə
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400 mb-2">
            <strong>EndirimAxtar</strong> heç bir market və ya şirkətlə əlaqəli
            deyil. Tamamilə müstəqil platformayıq.
          </p>
          <p className="text-xs text-gray-500">
            © 2024 EndirimAxtar. Bütün hüquqlar qorunur.
          </p>
        </div>
      </footer>
    </div>
  );
}
