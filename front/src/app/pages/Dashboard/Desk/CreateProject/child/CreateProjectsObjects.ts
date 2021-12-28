const Firstfields = [
    {
        index: 0,
        id: "name",
        name: "name",
        label: "اسم پروژه",
        onInvalidMessage: 'نام نباید خالی باشد',
        pattern: "[A-z]*",
        required: true,
        maxLength: 30,
        val: "name"
    },
];

let SecondsFields = [
    [{
        index: 3,
        id: "description",
        name: "description",
        height: "100px",
        multiline: "true",
        onInvalidMessageّ: 'توضیحات نباید خالی باشد',
        pattern: "[A-z']*",
        required: false,
        maxLength: 200,
        val: "description"
    }],
    [{
        index: 5,
        id: "amount",
        name: "amount",
        pattern: "[0-9.]+",
        type: "number",
        required: false,
        val: "amount",
        onInvalidMessage: 'فقط عدد مجاز است',
    }],
];
//label
let label = [
    "اسم پروژه شما چیست؟",
    "قصد دارید در چه زمینه ای پروژه ای ایجاد کنید؟",
    "چه مهارت هایی برای پروژه نیاز دارید؟",
    "درباره ی پروژه خود توضیح دهید",
    "زمان مورد نظر خود را برای پایان پروژه توضیح دهید",
    "بودجه شما برای پایان پروژه چقدر است؟",
];

let updateProject = [
    "اسم پروژه",
    "زمینه پروژه",
    "مهارت های مورد نیاز پروژه",
    "توضیحات پروژه",
    "زمان اتمام پروژه",
    "بودجه پروژه"
]


export {Firstfields, SecondsFields, label, updateProject};
