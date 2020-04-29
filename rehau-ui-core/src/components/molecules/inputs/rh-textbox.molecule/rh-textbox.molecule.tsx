import { Component, h, Prop, EventEmitter, Event, State, Watch } from '@stencil/core';
import { CategorizedResults } from '../../../interfaces/categorized-results';
import Inputmask from 'inputmask';
import { ControlProperties, ResultValidation } from '../../../interfaces/forms';
import { validateInput } from '../../../../utils/input-validators';

@Component({
  tag: 'rh-textbox',
  styleUrl: 'rh-textbox.molecule.scss',
  shadow: true
})
export class MhPropMolecule {
  // Mask Input
  @Prop() public mask: string = '';
  @Prop() public maskActive: boolean;

  // NEW INPUTS
  @Prop() public hourDisabled: Array<any>;
  @Prop() public dateDisable: Array<any>;
  @Prop() public calendarActive: boolean = false;
  @Prop() public calendarHourActive: boolean = false;
  @Prop() public label: string = '';
  @Prop() public disabled: boolean = false;
  @Prop() public placeholder: string = '';
  @Prop() public type: string = 'text';
  @Prop() public padding: boolean;
  @Prop() public setHour: string;
  @Prop() public ngModelVar: string = '';
  @Prop() public instructionText: string;
  @Prop() public maxlength: number;
  @Prop() public sugestions: Array<string> = [];
  @Prop() public sugestionsCatergories: Array<CategorizedResults> = [];
  @Prop() public areResultscategorized: boolean = false;
  @Prop() public minDate: string;
  @Prop() public maxDate: string;
  @Prop() public minHour: string;
  @Prop() public maxHour: string;

  // Error Properties
  @Prop() public error: boolean;
  @Prop() public errorText: string;
  @Prop() public showError: boolean = false;
  @Prop() public showCustomError: boolean;

  // Form Properties
  @Prop() public isFormComponent: boolean = false;
  @Prop() public formController: ControlProperties;

  // Event
  @Event() public emitDate: EventEmitter<any>;
  @Event() public emitHour: EventEmitter<any>;
  @Event({ eventName: 'checkEvent' }) public checked: EventEmitter<any>;
  @Event({ eventName: 'update' }) public update: EventEmitter<any>;
  @Event() public onFocus: EventEmitter<any>;

  // Form
  private status: ResultValidation;
  @State() private formError: string;

  public maxlengthK: number;
  public showAutoPopup: boolean = false;
  public ext: string = '.svg';
  public fullPath: string = '';
  public fullPathR: string = '';
  public fullPathError: string = '';
  @State() public modelNgsubtr: string = '';
  @State() public calendar: boolean = false;
  public items: any;
  public categorizedItems: any;
  public itemVisible: boolean = false;
  public element: HTMLElement;

  constructor() {
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

  public componentWillLoad(): void {
    if (this.isFormComponent) {
      this.status = validateInput(this.formController.validators, this.ngModelVar);
      this.status.isPristine = true;
    }
    if (this.showCustomError && this.errorText !== undefined) {
      this.getTextError();
      this.error = true;
    }
  }

  public componentWillUpdate(): any {
    if (this.isFormComponent) {
      this.status = { ...this.status, ...validateInput(this.formController.validators, this.ngModelVar) };
    }
    if (this.showCustomError && this.errorText !== undefined) {
      this.getTextError();
      this.error = true;
    }
  }

  private getTextError(error?: string): void {
    if (error === undefined) {
      this.formError = this.errorText;
    } else {
      this.formError = error;
    }
  }

  private handleChange(): void {
    this.status = validateInput(this.formController.validators, this.ngModelVar);
    this.status.isPristine = false;
    if (this.status.errors.length > 0) {
      this.status.errors.map((error: string) => {
        this.getTextError(error);
        this.error = true;
      });
    } else {
      this.error = false;
      this.showCustomError = false;
    }
  }

  private addMaskInput(): void {
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

  private handleInputChange(event: any): void {
    this.ngModelVar = event.target.value;
    this.modelNgsubtr = event.target.value;
    this.update.emit(this.ngModelVar);
    this.setFilteredItems();
    if (this.isFormComponent) {
      this.handleChange();
    }
  }

  public selectedChecked(event: any): void {
    if (this.calendar === false) {
      this.calendar = true;
      this.checkDateError();
    } else if (this.calendar === true) {
      this.calendar = false;
    }
    this.checked.emit(event);
    this.itemVisible = false;
  }

  public checkDateError(): void {
    this.error = false;

    if (this.calendarActive) {
      if (this.ngModelVar.length === 10) {
        let day: number = this.getDateFromCalendar(this.ngModelVar).day;
        let month: number = this.getDateFromCalendar(this.ngModelVar).month;
        let year: number = this.getDateFromCalendar(this.ngModelVar).year;
        let minday: number;
        let maxday: number;
        let minMonth: number;
        let maxMonth: number;
        let minYear: number;
        let maxYear: number;
        let countMin: number;
        let countMax: number;
        if (month <= 12 && month > 0) {
          let numberOfMonth: number = new Date(year, month, 0).getDate();
          if (day > 0 && day <= numberOfMonth) {
            if (this.minDate !== undefined) {
              minday = this.getDateFromCalendar(this.minDate).day;
              minMonth = this.getDateFromCalendar(this.minDate).month;
              minYear = this.getDateFromCalendar(this.minDate).year;
              countMin = year - minYear;
              if (countMin < 0) countMin = 0;
              if (countMin === 0) {
                this.checkErrorMinDate(year, minYear, month, minMonth, countMin, day, minday);
              }
            }
            if (this.maxDate !== undefined) {
              maxday = this.getDateFromCalendar(this.maxDate).day;
              maxMonth = this.getDateFromCalendar(this.maxDate).month;
              maxYear = this.getDateFromCalendar(this.maxDate).year;
              countMax = maxYear - year;
              if (countMax < 0) countMax = 0;
              if (countMax === 0) {
                this.checkErrorMaxDate(year, maxYear, month, maxMonth, countMax, day, maxday);
              }
            }
          } else {
            this.setError('error.date');
          }
        } else {
          this.setError('error.date');
        }
      } else if (this.ngModelVar.length > 0 && this.ngModelVar.length < 10) {
        this.setError('error.minlength');
      } else {
        this.setError('error.required');
      }
    } else if (this.calendarHourActive) {
      if (this.ngModelVar.length === 5) {
        let hours: number = this.getHour(this.ngModelVar).hour;
        let minutes: number = this.getHour(this.ngModelVar).minute;

        if (hours >= 0 && hours < 24) {
          if (this.minHour !== null && this.minHour !== undefined) {
            let minhour: number = this.getHour(this.minHour).hour;
            let minminute: number = this.getHour(this.minHour).minute;
            if (this.minHour.length === 16 && this.setHour !== undefined && this.setHour !== null) {
              let day: number = this.getDateFromCalendar(this.setHour).day;
              let month: number = this.getDateFromCalendar(this.setHour).month;
              let year: number = this.getDateFromCalendar(this.setHour).year;
              if (
                day === this.getDateHour(this.minHour).day &&
                month === this.getDateHour(this.minHour).month &&
                year === this.getDateHour(this.minHour).year
              ) {
                this.checkErrorMinHour(hours, minhour, minutes, minminute);
              }
            } else this.checkErrorMinHour(hours, minhour, minutes, minminute);
          }
          if (this.maxHour !== null && this.maxHour !== undefined) {
            let maxhour: number = this.getHour(this.maxHour).hour;
            let maxminute: number = this.getHour(this.maxHour).minute;
            if (this.maxHour.length === 16 && this.setHour !== undefined && this.setHour !== null) {
              let day: number = this.getDateFromCalendar(this.setHour).day;
              let month: number = this.getDateFromCalendar(this.setHour).month;
              let year: number = this.getDateFromCalendar(this.setHour).year;
              if (
                day === this.getDateHour(this.maxHour).day &&
                month === this.getDateHour(this.maxHour).month &&
                year === this.getDateHour(this.maxHour).year
              ) {
                this.checkErrorMaxHour(hours, maxhour, minutes, maxminute);
              }
            } else this.checkErrorMaxHour(hours, maxhour, minutes, maxminute);
          }
          if (this.hourDisabled.length > 0 && this.hourDisabled !== undefined) {
            for (let i: number = 0; i < this.hourDisabled.length; i++) {
              let day: number;
              let month: number;
              let year: number;
              let hour: number = this.getHour(this.ngModelVar).hour;
              let min: number = this.getHour(this.ngModelVar).minute;
              if (this.setHour !== undefined && this.setHour !== null) {
                day = this.getDateFromCalendar(this.setHour).day;
                month = this.getDateFromCalendar(this.setHour).month;
                year = this.getDateFromCalendar(this.setHour).year;
              }
              let hourString: string = this.hourDisabled[i];
              let disablehour: number = this.getHour(hourString).hour;
              let disableminute: number = this.getHour(hourString).minute;
              if (this.hourDisabled[i].length === 5) {
                if (disablehour === hour) this.checkDisabledHour(min, disableminute);
              } else if (this.hourDisabled[i].length === 16) {
                if (
                  day === this.getDateHour(hourString).day &&
                  month === this.getDateHour(hourString).month &&
                  year === this.getDateHour(hourString).year
                ) {
                  if (disablehour === hour) this.checkDisabledHour(min, disableminute);
                }
              }
            }
          }
          if (minutes < 0 || minutes > 59) {
            this.setError('error.minutes');
          }
        } else this.setError('error.hours');
      } else if (this.ngModelVar.length > 0 && this.ngModelVar.length < 5) {
        this.setError('error.minlength');
      } else {
        this.setError('error.required');
      }
    }
    this.checkErrorStatusHour();
  }

  private getDateFromCalendar(date: string): any {
    let dateObject: object = {
      day: Number(date.substring(0, 2)),
      month: Number(date.substring(3, 5)),
      year: Number(date.substring(6, 11))
    };
    return dateObject;
  }

  private getHour(hour: string): any {
    let hourObject: object = {
      hour: Number(hour.substring(0, 2)),
      minute: Number(hour.substring(3, 5))
    };
    return hourObject;
  }

  private getDateHour(date: string): any {
    let dateObject: object = {
      day: Number(date.substring(6, 8)),
      month: Number(date.substring(9, 11)),
      year: Number(date.substring(12, 16))
    };
    return dateObject;
  }

  private checkErrorStatusHour(): void {
    if (this.error) {
      let todayDate: Date = new Date();

      if (this.calendarActive) {
        let stringDate: string = todayDate.getDate() < 10 ? '0' + todayDate.getDate() : String(todayDate.getDate());
        let stringMonth: string =
          todayDate.getMonth() + 1 < 10 ? '0' + (todayDate.getMonth() + 1) : String(todayDate.getMonth() + 1);

        this.modelNgsubtr = `${stringDate}/${stringMonth}/${todayDate.getFullYear()}`;
      } else if (this.calendarHourActive) {
        let stringHours: string = todayDate.getHours() < 10 ? '0' + todayDate.getHours() : String(todayDate.getHours());
        let stringMinutes: string =
          todayDate.getMinutes() < 10 ? '0' + todayDate.getMinutes() : String(todayDate.getMinutes());

        this.modelNgsubtr = `${stringHours}:${stringMinutes}`;
      }
    } else {
      this.modelNgsubtr = this.ngModelVar;
    }
  }

  public setError(text: string): void {
    this.getTextError(text);
    this.error = true;
    if (this.calendarActive && this.calendarHourActive) this.modelNgsubtr = '';
  }

  private checkErrorMinDate(
    year: number,
    minYear: number,
    month: number,
    minMonth: number,
    countMin: number,
    day: number,
    minday: number
  ): void {
    if (year >= minYear) {
      if (month >= minMonth && countMin === 0) {
        if (day < minday && month === minMonth) this.setError('error.date');
      } else this.setError('error.date');
    } else this.setError('error.date');
  }

  private checkErrorMaxDate(
    year: number,
    maxYear: number,
    month: number,
    maxMonth: number,
    countMax: number,
    day: number,
    maxday: number
  ): void {
    if (year <= maxYear) {
      if (month <= maxMonth && countMax === 0) {
        if (day > maxday && month === maxMonth) this.setError('error.date');
      } else this.setError('error.date');
    } else this.setError('error.date');
  }

  private checkErrorMinHour(hours: number, minhour: number, minutes: number, minminute: number): void {
    if (hours >= minhour) {
      if (hours <= minhour && minutes < minminute) {
        this.setError('error.hours');
      }
    } else {
      this.setError('error.hours');
    }
  }

  private checkErrorMaxHour(hours: number, maxhour: number, minutes: number, maxminute: number): void {
    if (hours <= maxhour) {
      if (hours >= maxhour && minutes > maxminute) {
        this.setError('error.hours');
      }
    } else {
      this.setError('error.hours');
    }
  }

  private checkDisabledHour(dMin: number, minute: number): void {
    if (dMin >= minute && dMin < minute + 30) {
      this.setError('error.hours');
    }
  }

  public setFilteredItems(): void {
    this.items = this.filterItems(this.sugestions, this.ngModelVar, this.maxlength);
    this.categorizedItems = this.filterCategorizedItems(this.sugestionsCatergories, this.ngModelVar, this.maxlength);

    if (this.ngModelVar !== '') {
      this.itemVisible = true;
    } else {
      this.itemVisible = false;
    }
  }

  public itemSelected(item: any): any {
    this.ngModelVar = item;
    this.setFilteredItems();
    this.itemVisible = false;
  }

  public setSuggestionsVisibilityFalse(event: any): void {
    if (event.isOutside) {
      this.itemVisible = false;
      this.calendar = false;
    }
  }

  public filterCategorizedItems(categories: CategorizedResults[], searchTerm: any, lengthMax: any): any {
    let response: CategorizedResults[] = [];

    categories.forEach(category => {
      let filteredResults: string[] = this.filterItems(category.results, searchTerm, lengthMax);
      if (filteredResults.length > 0) {
        response.push({ categoryName: category.categoryName, results: filteredResults });
      }
    });

    return response;
  }

  public filterItems(items: any, searchTerm: any, lengthMax: any): any {
    return items.filter((item: any) => {
      if (item.length <= lengthMax) {
        return item.toLowerCase().lastIndexOf(searchTerm.toLowerCase(), item.length) > -1;
      } else {
        return false;
      }
    });
  }

  private setHourDate(day: number, month: number, year: number): void {
    if (month < 10) {
      if (day < 10) this.setHour = '0' + day + '/0' + month + '/' + year;
      else this.setHour = day + '/0' + month + '/' + year;
    } else {
      if (day < 10) this.setHour = '0' + day + '/' + month + '/' + year;
      else this.setHour = day + '/' + month + '/' + year;
    }
  }

  public showDate(dateObject: any): void {
    let e: any = dateObject.detail;
    if (e.hour !== undefined) {
      this.ngModelVar = e.hour;
      this.setHourDate(e.date[0].day, e.date[0].month, e.date[0].year);
    } else this.ngModelVar = e;
    this.modelNgsubtr = this.ngModelVar;
    if (e.length === 10) this.emitDate.emit(e);
    else if (e instanceof Object) this.emitHour.emit(e);
    this.calendar = false;
    this.error = false;
  }

  public setDate(dateObject: any): void {
    let ev: any = dateObject.detail;
    let minCheck: Array<any> = ev.minCheck;
    this.setHourDate(ev.day, ev.month, ev.year);
    let hours: number = Number(this.ngModelVar.substring(0, 2));
    let minutes: number = Number(this.ngModelVar.substring(3, 5));
    if (minutes >= 0 && minutes < 30) minutes = 0;
    else if (minutes >= 30 && minutes < 60) minutes = 30;
    if (this.minHour.length === 16) {
      let day: number = Number(this.minHour.substring(6, 8));
      let month: number = Number(this.minHour.substring(9, 11));
      let year: number = Number(this.minHour.substring(12, 16));
      let active: boolean = true;
      if (day === ev.day && month === ev.month && year === ev.year) {
        let i: number = 0;
        do {
          if (
            hours === Number(minCheck[i].hour) &&
            minutes === Number(minCheck[i].minute) &&
            Number(minCheck[i].status)
          ) {
            this.setError('error.hours');
            this.checkErrorStatusHour();
            active = false;
          }
          i++;
        } while (active && i < minCheck.length);
      } else {
        this.error = false;
        this.checkErrorStatusHour();
      }
    }
  }

  public selectedEvent(event: any): void {
    if (!this.maskActive) {
      if (event !== '') {
        this.error = false;
      } else {
        this.error = true;
      }
    }
  }

  public handleFocus(event: any): any {
    this.ngModelVar = event.target.value;
    this.modelNgsubtr = event.target.value;
    this.onFocus.emit(this.ngModelVar);
}

  public render(): void {
    const paddingClass: any = {
      'box-padding': this.padding,
      'no-padding': !this.padding
    };
    const labelClass: any = {
      'label': true,
    };

    const containerBox: any = {
      'containerBox row': true
    };
    const description: any = {
      'description': true
    };
    const inputClass: any = {
      'input-field': true
    };
    return (
      <div class={paddingClass} style={{ 'box-sizing': 'border-box' }}>
        <div>{this.label && <p class={labelClass}>{this.label}</p>}</div>
        <div style={{ position: 'relative' }}>
          <div class={containerBox}>
              <input
                class={inputClass}
                type={this.type}
                placeholder={this.placeholder}
                value={this.ngModelVar}
                maxLength={this.maxlength}
                ref={(el: HTMLElement) => {
                  this.element = el;
                  if (this.maskActive) {
                    this.addMaskInput();
                  }
                }}
                onInput={(event: any) => this.handleInputChange(event)}
                onBlur={() => {
                  this.handleChange();
                  if (this.calendarActive || this.calendarHourActive) this.checkDateError();
                }}
                onChange={(event: any) => this.selectedEvent(event)}
                onFocus={(event: any) =>  this.handleFocus(event)}
              />   
          </div>
          {this.instructionText && (
            <div>
              {!this.error && (
                <div class={description}>
                  <span>{this.instructionText}</span>
                </div>
              )}
            </div>
          )}
          {this.error && this.errorText !== undefined && !this.calendar && (
            <div class='error'>
              <span>{this.formError}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}
