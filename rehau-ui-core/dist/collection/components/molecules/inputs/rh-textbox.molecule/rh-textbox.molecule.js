import { h } from "@stencil/core";
import Inputmask from 'inputmask';
import { validateInput } from '../../../../utils/input-validators';
export class MhPropMolecule {
    constructor() {
        // Mask Input
        this.mask = '';
        this.calendarActive = false;
        this.calendarHourActive = false;
        this.label = '';
        this.disabled = false;
        this.placeholder = '';
        this.type = 'text';
        this.ngModelVar = '';
        this.sugestions = [];
        this.sugestionsCatergories = [];
        this.areResultscategorized = false;
        this.showError = false;
        // Form Properties
        this.isFormComponent = false;
        this.showAutoPopup = false;
        this.ext = '.svg';
        this.fullPath = '';
        this.fullPathR = '';
        this.fullPathError = '';
        this.modelNgsubtr = '';
        this.calendar = false;
        this.itemVisible = false;
        this.formController = {
            disabled: false,
            id: '',
            showAllErrors: false,
            validators: []
        };
        this.status = {
            currentValue: '',
            errors: [],
            isPristine: true,
            valid: false
        };
    }
    componentWillLoad() {
        if (this.isFormComponent) {
            this.status = validateInput(this.formController.validators, this.ngModelVar);
            this.status.isPristine = true;
        }
        if (this.showCustomError && this.errorText !== undefined) {
            this.getTextError();
            this.error = true;
        }
    }
    componentWillUpdate() {
        if (this.isFormComponent) {
            this.status = Object.assign(Object.assign({}, this.status), validateInput(this.formController.validators, this.ngModelVar));
        }
        if (this.showCustomError && this.errorText !== undefined) {
            this.getTextError();
            this.error = true;
        }
    }
    getTextError(error) {
        if (error === undefined) {
            this.formError = this.errorText;
        }
        else {
            this.formError = error;
        }
    }
    handleChange() {
        this.status = validateInput(this.formController.validators, this.ngModelVar);
        this.status.isPristine = false;
        if (this.status.errors.length > 0) {
            this.status.errors.map((error) => {
                this.getTextError(error);
                this.error = true;
            });
        }
        else {
            this.error = false;
            this.showCustomError = false;
        }
    }
    addMaskInput() {
        Inputmask({
            mask: this.mask,
            groupmarker: { start: '&', end: '&' },
            showMaskOnHover: false,
            showMaskOnFocus: false,
            clearMaskOnLostFocus: true,
            hideMaskOnFocus: true,
            greedy: false,
            placeholder: '',
            oncomplete: () => (this.error = false),
            onchange: () => (this.error = false)
        }).mask(this.element);
    }
    handleInputChange(event) {
        this.ngModelVar = event.target.value;
        this.modelNgsubtr = event.target.value;
        this.update.emit(this.ngModelVar);
        this.setFilteredItems();
        if (this.isFormComponent) {
            this.handleChange();
        }
    }
    selectedChecked(event) {
        if (this.calendar === false) {
            this.calendar = true;
            this.checkDateError();
        }
        else if (this.calendar === true) {
            this.calendar = false;
        }
        this.checked.emit(event);
        this.itemVisible = false;
    }
    checkDateError() {
        this.error = false;
        if (this.calendarActive) {
            if (this.ngModelVar.length === 10) {
                let day = this.getDateFromCalendar(this.ngModelVar).day;
                let month = this.getDateFromCalendar(this.ngModelVar).month;
                let year = this.getDateFromCalendar(this.ngModelVar).year;
                let minday;
                let maxday;
                let minMonth;
                let maxMonth;
                let minYear;
                let maxYear;
                let countMin;
                let countMax;
                if (month <= 12 && month > 0) {
                    let numberOfMonth = new Date(year, month, 0).getDate();
                    if (day > 0 && day <= numberOfMonth) {
                        if (this.minDate !== undefined) {
                            minday = this.getDateFromCalendar(this.minDate).day;
                            minMonth = this.getDateFromCalendar(this.minDate).month;
                            minYear = this.getDateFromCalendar(this.minDate).year;
                            countMin = year - minYear;
                            if (countMin < 0)
                                countMin = 0;
                            if (countMin === 0) {
                                this.checkErrorMinDate(year, minYear, month, minMonth, countMin, day, minday);
                            }
                        }
                        if (this.maxDate !== undefined) {
                            maxday = this.getDateFromCalendar(this.maxDate).day;
                            maxMonth = this.getDateFromCalendar(this.maxDate).month;
                            maxYear = this.getDateFromCalendar(this.maxDate).year;
                            countMax = maxYear - year;
                            if (countMax < 0)
                                countMax = 0;
                            if (countMax === 0) {
                                this.checkErrorMaxDate(year, maxYear, month, maxMonth, countMax, day, maxday);
                            }
                        }
                    }
                    else {
                        this.setError('error.date');
                    }
                }
                else {
                    this.setError('error.date');
                }
            }
            else if (this.ngModelVar.length > 0 && this.ngModelVar.length < 10) {
                this.setError('error.minlength');
            }
            else {
                this.setError('error.required');
            }
        }
        else if (this.calendarHourActive) {
            if (this.ngModelVar.length === 5) {
                let hours = this.getHour(this.ngModelVar).hour;
                let minutes = this.getHour(this.ngModelVar).minute;
                if (hours >= 0 && hours < 24) {
                    if (this.minHour !== null && this.minHour !== undefined) {
                        let minhour = this.getHour(this.minHour).hour;
                        let minminute = this.getHour(this.minHour).minute;
                        if (this.minHour.length === 16 && this.setHour !== undefined && this.setHour !== null) {
                            let day = this.getDateFromCalendar(this.setHour).day;
                            let month = this.getDateFromCalendar(this.setHour).month;
                            let year = this.getDateFromCalendar(this.setHour).year;
                            if (day === this.getDateHour(this.minHour).day &&
                                month === this.getDateHour(this.minHour).month &&
                                year === this.getDateHour(this.minHour).year) {
                                this.checkErrorMinHour(hours, minhour, minutes, minminute);
                            }
                        }
                        else
                            this.checkErrorMinHour(hours, minhour, minutes, minminute);
                    }
                    if (this.maxHour !== null && this.maxHour !== undefined) {
                        let maxhour = this.getHour(this.maxHour).hour;
                        let maxminute = this.getHour(this.maxHour).minute;
                        if (this.maxHour.length === 16 && this.setHour !== undefined && this.setHour !== null) {
                            let day = this.getDateFromCalendar(this.setHour).day;
                            let month = this.getDateFromCalendar(this.setHour).month;
                            let year = this.getDateFromCalendar(this.setHour).year;
                            if (day === this.getDateHour(this.maxHour).day &&
                                month === this.getDateHour(this.maxHour).month &&
                                year === this.getDateHour(this.maxHour).year) {
                                this.checkErrorMaxHour(hours, maxhour, minutes, maxminute);
                            }
                        }
                        else
                            this.checkErrorMaxHour(hours, maxhour, minutes, maxminute);
                    }
                    if (this.hourDisabled.length > 0 && this.hourDisabled !== undefined) {
                        for (let i = 0; i < this.hourDisabled.length; i++) {
                            let day;
                            let month;
                            let year;
                            let hour = this.getHour(this.ngModelVar).hour;
                            let min = this.getHour(this.ngModelVar).minute;
                            if (this.setHour !== undefined && this.setHour !== null) {
                                day = this.getDateFromCalendar(this.setHour).day;
                                month = this.getDateFromCalendar(this.setHour).month;
                                year = this.getDateFromCalendar(this.setHour).year;
                            }
                            let hourString = this.hourDisabled[i];
                            let disablehour = this.getHour(hourString).hour;
                            let disableminute = this.getHour(hourString).minute;
                            if (this.hourDisabled[i].length === 5) {
                                if (disablehour === hour)
                                    this.checkDisabledHour(min, disableminute);
                            }
                            else if (this.hourDisabled[i].length === 16) {
                                if (day === this.getDateHour(hourString).day &&
                                    month === this.getDateHour(hourString).month &&
                                    year === this.getDateHour(hourString).year) {
                                    if (disablehour === hour)
                                        this.checkDisabledHour(min, disableminute);
                                }
                            }
                        }
                    }
                    if (minutes < 0 || minutes > 59) {
                        this.setError('error.minutes');
                    }
                }
                else
                    this.setError('error.hours');
            }
            else if (this.ngModelVar.length > 0 && this.ngModelVar.length < 5) {
                this.setError('error.minlength');
            }
            else {
                this.setError('error.required');
            }
        }
        this.checkErrorStatusHour();
    }
    getDateFromCalendar(date) {
        let dateObject = {
            day: Number(date.substring(0, 2)),
            month: Number(date.substring(3, 5)),
            year: Number(date.substring(6, 11))
        };
        return dateObject;
    }
    getHour(hour) {
        let hourObject = {
            hour: Number(hour.substring(0, 2)),
            minute: Number(hour.substring(3, 5))
        };
        return hourObject;
    }
    getDateHour(date) {
        let dateObject = {
            day: Number(date.substring(6, 8)),
            month: Number(date.substring(9, 11)),
            year: Number(date.substring(12, 16))
        };
        return dateObject;
    }
    checkErrorStatusHour() {
        if (this.error) {
            let todayDate = new Date();
            if (this.calendarActive) {
                let stringDate = todayDate.getDate() < 10 ? '0' + todayDate.getDate() : String(todayDate.getDate());
                let stringMonth = todayDate.getMonth() + 1 < 10 ? '0' + (todayDate.getMonth() + 1) : String(todayDate.getMonth() + 1);
                this.modelNgsubtr = `${stringDate}/${stringMonth}/${todayDate.getFullYear()}`;
            }
            else if (this.calendarHourActive) {
                let stringHours = todayDate.getHours() < 10 ? '0' + todayDate.getHours() : String(todayDate.getHours());
                let stringMinutes = todayDate.getMinutes() < 10 ? '0' + todayDate.getMinutes() : String(todayDate.getMinutes());
                this.modelNgsubtr = `${stringHours}:${stringMinutes}`;
            }
        }
        else {
            this.modelNgsubtr = this.ngModelVar;
        }
    }
    setError(text) {
        this.getTextError(text);
        this.error = true;
        if (this.calendarActive && this.calendarHourActive)
            this.modelNgsubtr = '';
    }
    checkErrorMinDate(year, minYear, month, minMonth, countMin, day, minday) {
        if (year >= minYear) {
            if (month >= minMonth && countMin === 0) {
                if (day < minday && month === minMonth)
                    this.setError('error.date');
            }
            else
                this.setError('error.date');
        }
        else
            this.setError('error.date');
    }
    checkErrorMaxDate(year, maxYear, month, maxMonth, countMax, day, maxday) {
        if (year <= maxYear) {
            if (month <= maxMonth && countMax === 0) {
                if (day > maxday && month === maxMonth)
                    this.setError('error.date');
            }
            else
                this.setError('error.date');
        }
        else
            this.setError('error.date');
    }
    checkErrorMinHour(hours, minhour, minutes, minminute) {
        if (hours >= minhour) {
            if (hours <= minhour && minutes < minminute) {
                this.setError('error.hours');
            }
        }
        else {
            this.setError('error.hours');
        }
    }
    checkErrorMaxHour(hours, maxhour, minutes, maxminute) {
        if (hours <= maxhour) {
            if (hours >= maxhour && minutes > maxminute) {
                this.setError('error.hours');
            }
        }
        else {
            this.setError('error.hours');
        }
    }
    checkDisabledHour(dMin, minute) {
        if (dMin >= minute && dMin < minute + 30) {
            this.setError('error.hours');
        }
    }
    setFilteredItems() {
        this.items = this.filterItems(this.sugestions, this.ngModelVar, this.maxlength);
        this.categorizedItems = this.filterCategorizedItems(this.sugestionsCatergories, this.ngModelVar, this.maxlength);
        if (this.ngModelVar !== '') {
            this.itemVisible = true;
        }
        else {
            this.itemVisible = false;
        }
    }
    itemSelected(item) {
        this.ngModelVar = item;
        this.setFilteredItems();
        this.itemVisible = false;
    }
    setSuggestionsVisibilityFalse(event) {
        if (event.isOutside) {
            this.itemVisible = false;
            this.calendar = false;
        }
    }
    filterCategorizedItems(categories, searchTerm, lengthMax) {
        let response = [];
        categories.forEach(category => {
            let filteredResults = this.filterItems(category.results, searchTerm, lengthMax);
            if (filteredResults.length > 0) {
                response.push({ categoryName: category.categoryName, results: filteredResults });
            }
        });
        return response;
    }
    filterItems(items, searchTerm, lengthMax) {
        return items.filter((item) => {
            if (item.length <= lengthMax) {
                return item.toLowerCase().lastIndexOf(searchTerm.toLowerCase(), item.length) > -1;
            }
            else {
                return false;
            }
        });
    }
    setHourDate(day, month, year) {
        if (month < 10) {
            if (day < 10)
                this.setHour = '0' + day + '/0' + month + '/' + year;
            else
                this.setHour = day + '/0' + month + '/' + year;
        }
        else {
            if (day < 10)
                this.setHour = '0' + day + '/' + month + '/' + year;
            else
                this.setHour = day + '/' + month + '/' + year;
        }
    }
    showDate(dateObject) {
        let e = dateObject.detail;
        if (e.hour !== undefined) {
            this.ngModelVar = e.hour;
            this.setHourDate(e.date[0].day, e.date[0].month, e.date[0].year);
        }
        else
            this.ngModelVar = e;
        this.modelNgsubtr = this.ngModelVar;
        if (e.length === 10)
            this.emitDate.emit(e);
        else if (e instanceof Object)
            this.emitHour.emit(e);
        this.calendar = false;
        this.error = false;
    }
    setDate(dateObject) {
        let ev = dateObject.detail;
        let minCheck = ev.minCheck;
        this.setHourDate(ev.day, ev.month, ev.year);
        let hours = Number(this.ngModelVar.substring(0, 2));
        let minutes = Number(this.ngModelVar.substring(3, 5));
        if (minutes >= 0 && minutes < 30)
            minutes = 0;
        else if (minutes >= 30 && minutes < 60)
            minutes = 30;
        if (this.minHour.length === 16) {
            let day = Number(this.minHour.substring(6, 8));
            let month = Number(this.minHour.substring(9, 11));
            let year = Number(this.minHour.substring(12, 16));
            let active = true;
            if (day === ev.day && month === ev.month && year === ev.year) {
                let i = 0;
                do {
                    if (hours === Number(minCheck[i].hour) &&
                        minutes === Number(minCheck[i].minute) &&
                        Number(minCheck[i].status)) {
                        this.setError('error.hours');
                        this.checkErrorStatusHour();
                        active = false;
                    }
                    i++;
                } while (active && i < minCheck.length);
            }
            else {
                this.error = false;
                this.checkErrorStatusHour();
            }
        }
    }
    selectedEvent(event) {
        if (!this.maskActive) {
            if (event !== '') {
                this.error = false;
            }
            else {
                this.error = true;
            }
        }
    }
    handleFocus(event) {
        this.ngModelVar = event.target.value;
        this.modelNgsubtr = event.target.value;
        this.onFocus.emit(this.ngModelVar);
    }
    render() {
        const paddingClass = {
            'box-padding': this.padding,
            'no-padding': !this.padding
        };
        const labelClass = {
            'label': true,
        };
        const containerBox = {
            'containerBox row': true
        };
        const description = {
            'description': true
        };
        const inputClass = {
            'input-field': true
        };
        return (h("div", { class: paddingClass, style: { 'box-sizing': 'border-box' } },
            h("div", null, this.label && h("p", { class: labelClass }, this.label)),
            h("div", { style: { position: 'relative' } },
                h("div", { class: containerBox },
                    h("input", { class: inputClass, type: this.type, placeholder: this.placeholder, value: this.ngModelVar, maxLength: this.maxlength, ref: (el) => {
                            this.element = el;
                            if (this.maskActive) {
                                this.addMaskInput();
                            }
                        }, onInput: (event) => this.handleInputChange(event), onBlur: () => {
                            this.handleChange();
                            if (this.calendarActive || this.calendarHourActive)
                                this.checkDateError();
                        }, onChange: (event) => this.selectedEvent(event), onFocus: (event) => this.handleFocus(event) })),
                this.instructionText && (h("div", null, !this.error && (h("div", { class: description },
                    h("span", null, this.instructionText))))),
                this.error && this.errorText !== undefined && !this.calendar && (h("div", { class: 'error' },
                    h("span", null, this.formError))))));
    }
    static get is() { return "rh-textbox"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["rh-textbox.molecule.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["rh-textbox.molecule.css"]
    }; }
    static get properties() { return {
        "mask": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "mask",
            "reflect": false,
            "defaultValue": "''"
        },
        "maskActive": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "mask-active",
            "reflect": false
        },
        "hourDisabled": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Array<any>",
                "resolved": "any[]",
                "references": {
                    "Array": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "dateDisable": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Array<any>",
                "resolved": "any[]",
                "references": {
                    "Array": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        },
        "calendarActive": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "calendar-active",
            "reflect": false,
            "defaultValue": "false"
        },
        "calendarHourActive": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "calendar-hour-active",
            "reflect": false,
            "defaultValue": "false"
        },
        "label": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "label",
            "reflect": false,
            "defaultValue": "''"
        },
        "disabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "disabled",
            "reflect": false,
            "defaultValue": "false"
        },
        "placeholder": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "placeholder",
            "reflect": false,
            "defaultValue": "''"
        },
        "type": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "type",
            "reflect": false,
            "defaultValue": "'text'"
        },
        "padding": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "padding",
            "reflect": false
        },
        "setHour": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "set-hour",
            "reflect": false
        },
        "ngModelVar": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "ng-model-var",
            "reflect": false,
            "defaultValue": "''"
        },
        "instructionText": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "instruction-text",
            "reflect": false
        },
        "maxlength": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "maxlength",
            "reflect": false
        },
        "sugestions": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Array<string>",
                "resolved": "string[]",
                "references": {
                    "Array": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "[]"
        },
        "sugestionsCatergories": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Array<CategorizedResults>",
                "resolved": "CategorizedResults[]",
                "references": {
                    "Array": {
                        "location": "global"
                    },
                    "CategorizedResults": {
                        "location": "import",
                        "path": "../../../interfaces/categorized-results"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "[]"
        },
        "areResultscategorized": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "are-resultscategorized",
            "reflect": false,
            "defaultValue": "false"
        },
        "minDate": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "min-date",
            "reflect": false
        },
        "maxDate": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "max-date",
            "reflect": false
        },
        "minHour": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "min-hour",
            "reflect": false
        },
        "maxHour": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "max-hour",
            "reflect": false
        },
        "error": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "error",
            "reflect": false
        },
        "errorText": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "error-text",
            "reflect": false
        },
        "showError": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "show-error",
            "reflect": false,
            "defaultValue": "false"
        },
        "showCustomError": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "show-custom-error",
            "reflect": false
        },
        "isFormComponent": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "is-form-component",
            "reflect": false,
            "defaultValue": "false"
        },
        "formController": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "ControlProperties",
                "resolved": "ControlProperties",
                "references": {
                    "ControlProperties": {
                        "location": "import",
                        "path": "../../../interfaces/forms"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            }
        }
    }; }
    static get states() { return {
        "formError": {},
        "modelNgsubtr": {},
        "calendar": {}
    }; }
    static get events() { return [{
            "method": "emitDate",
            "name": "emitDate",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "emitHour",
            "name": "emitHour",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "checked",
            "name": "checkEvent",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "update",
            "name": "update",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "onFocus",
            "name": "onFocus",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
}
