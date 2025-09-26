import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appTitle: 'Social Support Application',
      openBadge: 'OPEN | مفتوحة',
      steps: {
        step1: 'Personal Information',
        step2: 'Family & Financial Info',
        step3: 'Situation Descriptions'
      },
      actions: { back: 'Back', next: 'Next', continue: 'Continue', submit: 'Submit', help: 'Help Me Write', discard: 'Discard', accept: 'Accept' },
      step1: {
        title: 'Personal Information',
        name: 'Name', nationalId: 'National ID', dob: 'Date of Birth', gender: 'Gender', address: 'Address', city: 'City', state: 'State', country: 'Country', phone: 'Phone', email: 'Email'
      },
      step2: {
        title: 'Family & Financial Info',
        maritalStatus: 'Marital Status', dependents: 'Dependents', employmentStatus: 'Employment Status', monthlyIncome: 'Monthly Income', housingStatus: 'Housing Status'
      },
      step3: {
        title: 'Situation Descriptions',
        financialSituation: 'Current Financial Situation', employmentCircumstances: 'Employment Circumstances', reasonForApplying: 'Reason for Applying', aiTitle: 'AI Suggestion', aiError: 'Could not load suggestion. Please try again.'
      }
    }
  },
  ar: {
    translation: {
      appTitle: 'طلب الدعم الاجتماعي',
      openBadge: 'OPEN | مفتوحة',
      steps: {
        step1: 'المعلومات الشخصية',
        step2: 'معلومات الأسرة والمالية',
        step3: 'وصف الحالة'
      },
      actions: { back: 'رجوع', next: 'التالي', continue: 'متابعة', submit: 'إرسال', help: 'ساعدني في الكتابة', discard: 'تجاهل', accept: 'اعتماد' },
      step1: {
        title: 'المعلومات الشخصية',
        name: 'الاسم', nationalId: 'الرقم الوطني', dob: 'تاريخ الميلاد', gender: 'الجنس', address: 'العنوان', city: 'المدينة', state: 'الولاية', country: 'الدولة', phone: 'الهاتف', email: 'البريد الإلكتروني'
      },
      step2: {
        title: 'معلومات الأسرة والمالية',
        maritalStatus: 'الحالة الاجتماعية', dependents: 'المُعالون', employmentStatus: 'حالة التوظيف', monthlyIncome: 'الدخل الشهري', housingStatus: 'حالة السكن'
      },
      step3: {
        title: 'وصف الحالة',
        financialSituation: 'الوضع المالي الحالي', employmentCircumstances: 'ظروف العمل', reasonForApplying: 'سبب التقديم', aiTitle: 'اقتراح الذكاء الاصطناعي', aiError: 'تعذر تحميل الاقتراح. حاول مرة أخرى.'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;



