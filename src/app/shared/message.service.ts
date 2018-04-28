import { Injectable } from "@angular/core";

@Injectable()
export class MessageService {
    getError(error) {
        if (error.required)
            return '* الزامی';
        else if (error.maxlength)
            return 'حداکثر ' + error.maxlength.requiredLength + ' حرف وارد نمائید';
        else if (error.minlength)
            return 'حداقل ' + error.minlength.requiredLength + ' حرف وارد نمائید';
        else if (error.pattern)
            return 'فقط عدد وارد نمائید';
        else if (error.email)
            return 'آدرس ایمیل اشتباه است';
    }
    getMessage(name) {
        if (name == 'successSave')
            return 'ذخیره اطلاعات با موفقیت انجام گردید';
        else if (name == 'errorSave')
            return 'خطا در ذخیره اطلاعات';
        else if (name == 'successUpdate')
            return 'ویرایش اطلاعات با موفقیت انجام گردید';
        else if (name == 'errorUpdate')
            return 'خطا در ویرایش اطلاعات';
        else if (name == 'doubleRecord')
            return 'رکورد ورودی تکراری می باشد';
        else if (name == 'notExistRecord')
            return 'رکورد مورد نظر در سیستم تعریف نشده است';
        else if (name == "fileError")
            return "فراخوانی فایل با مشکل روبرو شده است";
        else if (name == "fileOK")
            return "فراخوانی فایل انجام گردید";
    }
    getTranslator() {
        let transType: any[] = [];
        transType.push('مهدی قرمزکن');
        transType.push('مریم قرمزکن');
        transType.push('محمد قرمزکن');
        return transType;
    }
    getArticleType() {
        let transType: any[] = [];
        transType.push('مترجم');
        transType.push('نویسنده');
        return transType;
    }
}