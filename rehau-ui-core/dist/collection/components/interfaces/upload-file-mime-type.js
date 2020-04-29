export var mimeType;
(function (mimeType) {
    mimeType["pdf"] = "application/pdf";
    mimeType["pdfMobile"] = ".pdf";
    mimeType["word"] = "application/msword";
    mimeType["word2013"] = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    mimeType["wordMobile"] = ".docx";
    mimeType["wordMobileBis"] = ".doc";
    mimeType["excel"] = "application/vnd.ms-excel";
    mimeType["excelMobile"] = ".xlsx";
    mimeType["excel2013"] = ".xls";
    mimeType["androidApp"] = "application/vnd.android.package-archive";
    mimeType["androidAppFromMobile"] = ".apk";
    mimeType["audio"] = "audio/mp3";
    mimeType["audioMobile"] = ".mp3";
})(mimeType || (mimeType = {}));
