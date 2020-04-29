/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from './stencil.core';
import {
  RouterHistory,
} from '@stencil/router';
import {
  BasicAccordionModel,
} from './components/interfaces/basic-accordion-model';
import {
  BasicCarouselModel,
} from './components/interfaces/basic-carousel-model';
import {
  ControlProperties,
  ResultValidation,
} from './components/interfaces/forms';
import {
  DropdownElement,
} from './components/interfaces/dropdown-element';
import {
  InputDropdownEmit,
} from './components/interfaces/input-dropdown-emit';
import {
  BasicListItem,
} from './components/interfaces/basic-listitem-model';
import {
  ListItemVariation3,
} from './components/interfaces/list-item-variation3';
import {
  HorizontalTabMenuModel,
} from './components/interfaces/horizontal-tab-menu-model';
import {
  OnBoardingModel,
} from './components/interfaces/on-boarding-model';
import {
  RadioButton,
} from './components/interfaces/radio-button';
import {
  Breakpoints,
} from './components/molecules/responsive/responsive.controller';
import {
  CategorizedResults,
} from './components/interfaces/categorized-results';

export namespace Components {
  interface AccordianPage {
    'history': RouterHistory;
  }
  interface BadgesPage {
    'history': RouterHistory;
  }
  interface ButtonsPage {
    'history': RouterHistory;
  }
  interface CardPage {
    'history': RouterHistory;
  }
  interface CarouselSliderPage {
    'history': RouterHistory;
  }
  interface DividersPage {
    'history': RouterHistory;
  }
  interface FormPage {
    'history': RouterHistory;
  }
  interface HeadersPage {
    'history': RouterHistory;
  }
  interface HomePage {
    'history': RouterHistory;
  }
  interface IconLabelNavbarsPage {
    'history': RouterHistory;
  }
  interface IconNavbarsPage {
    'history': RouterHistory;
  }
  interface LabelNavbarsPage {
    'history': RouterHistory;
  }
  interface ListItems {
    'history': RouterHistory;
  }
  interface LoaderPage {
    'history': RouterHistory;
  }
  interface MarkdownReader {
    'history': RouterHistory;
  }
  interface ModalPage {
    'history': RouterHistory;
  }
  interface NavbarsListPage {
    'history': RouterHistory;
  }
  interface OnboardingPage {
    'history': RouterHistory;
  }
  interface ProgressBarPage {
    'history': RouterHistory;
  }
  interface RhAccordian {
    'accordions': Array<BasicAccordionModel>;
  }
  interface RhApp {}
  interface RhBadges {
    'badgeBgColor': string;
    'badgeRound': boolean;
    'badgeStatus': string;
    'badgetitle': string;
  }
  interface RhBreadcrumbs {
    'breadcrumbs': Array<string>;
  }
  interface RhCard {
    'carddescription': string;
    'cardsubtitle': string;
    'cardtitle': string;
  }
  interface RhCarouselSlider {
    'carousels': Array<BasicCarouselModel>;
    'colorBg': string | 'transparent' | 'grey' | 'white';
    'padding': boolean;
  }
  interface RhCheckbox {
    'checked': boolean;
    'disabled': boolean;
    'formController': ControlProperties;
    'isFormComponent': boolean;
    'left': boolean;
    'padding': boolean;
    'text': string;
    'textError': string;
  }
  interface RhDivider {
    'background': boolean;
    'bigSize': boolean;
    'fullWidth': boolean;
    'hrShow': boolean;
    'icon': string;
    'logoText': boolean;
    'padding': boolean;
    'text': string;
  }
  interface RhHeader {
    'backicon': boolean;
    'badgeActive': boolean;
    'badgeBgColor': string;
    'badgeStatus': string;
    'badgetitle': string;
    'deviceOnline': boolean;
    'headertitle': string;
    'icon': string;
    'innerpageheader': boolean;
    'righticon': boolean;
    'subtitle': string;
  }
  interface RhHome {}
  interface RhIcon {
    'color': string;
    'name': string;
    'size': string;
  }
  interface RhInputFieldDropdown {
    'elementlist': DropdownElement[];
    'formController': ControlProperties;
    'isFormComponent': boolean;
    'label': string;
    'opened': boolean;
    'padding': boolean;
    'placeholder': string;
    'value': string;
  }
  interface RhListItem {
    'itemList': Array<BasicListItem>;
  }
  interface RhListItemBadge {
    'badgeActive': boolean;
    'badgeBgColor': string;
    'badgeStatus': boolean;
    'badgetitle': string;
    'colorBg': string;
    'elements': string;
    'firstTitle': string;
    'icon': string;
    'iconLeftActive': boolean;
    'iconRight': boolean;
    'nested': boolean;
    'padding': boolean;
    'status': boolean;
    'subtitle': string;
  }
  interface RhListItemCheck {
    'itemList': Array<ListItemVariation3>;
  }
  interface RhListItemPrimary {
    'colorBg': string;
    'elements': string;
    'firstTitle': string;
    'icon': string;
    'iconRight': boolean;
    'nested': boolean;
    'padding': boolean;
    'status': boolean;
    'subtitle': string;
  }
  interface RhLoader {}
  interface RhModal {
    'actionText': string;
    'modalHeader': string;
    'modalMessage': string;
  }
  interface RhNavbar {
    'tabs': Array<HorizontalTabMenuModel>;
  }
  interface RhOnboarding {
    'activeIndex': string;
    'boardingSteps': Array<OnBoardingModel>;
    'progressValue': string;
  }
  interface RhPrimaryButton {
    'bgcolor': string;
    'color': string;
    'ctabutton': boolean;
    'disabled': boolean;
    'icon': string;
    'iconbutton': boolean;
    'iconsecondary': boolean;
    'secondary': boolean;
    'standard': boolean;
    'text': string;
    'transparentbutton': boolean;
  }
  interface RhProgressBar {
    'ProgressContentHidden': boolean;
    'progressAmount': string;
    'progressColor': string;
    'progressHeight': string;
    'progressWidth': string;
  }
  interface RhRadioButtonsList {
    'disabled': boolean;
    'formController': ControlProperties;
    'hasMargin': boolean;
    'inputTitle': string;
    'isFormComponent': boolean;
    'padding': boolean;
    'radioButtonList': RadioButton[];
    'radioPosition': string;
    'showDesktopCol': boolean;
  }
  interface RhResponsive {
    'breakpoints': Breakpoints[];
  }
  interface RhSlider {
    'colorBg': string | 'transparent' | 'grey' | 'white';
    'padding': boolean;
    'steps': Array<any>;
  }
  interface RhSliding {
    'closeSlider': (immediately?: boolean) => Promise<void>;
  }
  interface RhTab {
    'tabname': string;
  }
  interface RhTabContainer {}
  interface RhTextarea {
    'componentTitle': string;
    'maxLenght': number;
    'padding': boolean;
    'placeholder': string;
    'text': string;
  }
  interface RhTextbox {
    'areResultscategorized': boolean;
    'calendarActive': boolean;
    'calendarHourActive': boolean;
    'dateDisable': Array<any>;
    'disabled': boolean;
    'error': boolean;
    'errorText': string;
    'formController': ControlProperties;
    'hourDisabled': Array<any>;
    'instructionText': string;
    'isFormComponent': boolean;
    'label': string;
    'mask': string;
    'maskActive': boolean;
    'maxDate': string;
    'maxHour': string;
    'maxlength': number;
    'minDate': string;
    'minHour': string;
    'ngModelVar': string;
    'padding': boolean;
    'placeholder': string;
    'setHour': string;
    'showCustomError': boolean;
    'showError': boolean;
    'sugestions': Array<string>;
    'sugestionsCatergories': Array<CategorizedResults>;
    'type': string;
  }
  interface RhToggleSwitch {
    'border': boolean;
    'checked': boolean;
    'disabled': boolean;
    'leftText': string;
    'rightText': string;
  }
  interface ShowcasesPage {
    'history': RouterHistory;
  }
  interface TabPage {}
}

declare global {


  interface HTMLAccordianPageElement extends Components.AccordianPage, HTMLStencilElement {}
  var HTMLAccordianPageElement: {
    prototype: HTMLAccordianPageElement;
    new (): HTMLAccordianPageElement;
  };

  interface HTMLBadgesPageElement extends Components.BadgesPage, HTMLStencilElement {}
  var HTMLBadgesPageElement: {
    prototype: HTMLBadgesPageElement;
    new (): HTMLBadgesPageElement;
  };

  interface HTMLButtonsPageElement extends Components.ButtonsPage, HTMLStencilElement {}
  var HTMLButtonsPageElement: {
    prototype: HTMLButtonsPageElement;
    new (): HTMLButtonsPageElement;
  };

  interface HTMLCardPageElement extends Components.CardPage, HTMLStencilElement {}
  var HTMLCardPageElement: {
    prototype: HTMLCardPageElement;
    new (): HTMLCardPageElement;
  };

  interface HTMLCarouselSliderPageElement extends Components.CarouselSliderPage, HTMLStencilElement {}
  var HTMLCarouselSliderPageElement: {
    prototype: HTMLCarouselSliderPageElement;
    new (): HTMLCarouselSliderPageElement;
  };

  interface HTMLDividersPageElement extends Components.DividersPage, HTMLStencilElement {}
  var HTMLDividersPageElement: {
    prototype: HTMLDividersPageElement;
    new (): HTMLDividersPageElement;
  };

  interface HTMLFormPageElement extends Components.FormPage, HTMLStencilElement {}
  var HTMLFormPageElement: {
    prototype: HTMLFormPageElement;
    new (): HTMLFormPageElement;
  };

  interface HTMLHeadersPageElement extends Components.HeadersPage, HTMLStencilElement {}
  var HTMLHeadersPageElement: {
    prototype: HTMLHeadersPageElement;
    new (): HTMLHeadersPageElement;
  };

  interface HTMLHomePageElement extends Components.HomePage, HTMLStencilElement {}
  var HTMLHomePageElement: {
    prototype: HTMLHomePageElement;
    new (): HTMLHomePageElement;
  };

  interface HTMLIconLabelNavbarsPageElement extends Components.IconLabelNavbarsPage, HTMLStencilElement {}
  var HTMLIconLabelNavbarsPageElement: {
    prototype: HTMLIconLabelNavbarsPageElement;
    new (): HTMLIconLabelNavbarsPageElement;
  };

  interface HTMLIconNavbarsPageElement extends Components.IconNavbarsPage, HTMLStencilElement {}
  var HTMLIconNavbarsPageElement: {
    prototype: HTMLIconNavbarsPageElement;
    new (): HTMLIconNavbarsPageElement;
  };

  interface HTMLLabelNavbarsPageElement extends Components.LabelNavbarsPage, HTMLStencilElement {}
  var HTMLLabelNavbarsPageElement: {
    prototype: HTMLLabelNavbarsPageElement;
    new (): HTMLLabelNavbarsPageElement;
  };

  interface HTMLListItemsElement extends Components.ListItems, HTMLStencilElement {}
  var HTMLListItemsElement: {
    prototype: HTMLListItemsElement;
    new (): HTMLListItemsElement;
  };

  interface HTMLLoaderPageElement extends Components.LoaderPage, HTMLStencilElement {}
  var HTMLLoaderPageElement: {
    prototype: HTMLLoaderPageElement;
    new (): HTMLLoaderPageElement;
  };

  interface HTMLMarkdownReaderElement extends Components.MarkdownReader, HTMLStencilElement {}
  var HTMLMarkdownReaderElement: {
    prototype: HTMLMarkdownReaderElement;
    new (): HTMLMarkdownReaderElement;
  };

  interface HTMLModalPageElement extends Components.ModalPage, HTMLStencilElement {}
  var HTMLModalPageElement: {
    prototype: HTMLModalPageElement;
    new (): HTMLModalPageElement;
  };

  interface HTMLNavbarsListPageElement extends Components.NavbarsListPage, HTMLStencilElement {}
  var HTMLNavbarsListPageElement: {
    prototype: HTMLNavbarsListPageElement;
    new (): HTMLNavbarsListPageElement;
  };

  interface HTMLOnboardingPageElement extends Components.OnboardingPage, HTMLStencilElement {}
  var HTMLOnboardingPageElement: {
    prototype: HTMLOnboardingPageElement;
    new (): HTMLOnboardingPageElement;
  };

  interface HTMLProgressBarPageElement extends Components.ProgressBarPage, HTMLStencilElement {}
  var HTMLProgressBarPageElement: {
    prototype: HTMLProgressBarPageElement;
    new (): HTMLProgressBarPageElement;
  };

  interface HTMLRhAccordianElement extends Components.RhAccordian, HTMLStencilElement {}
  var HTMLRhAccordianElement: {
    prototype: HTMLRhAccordianElement;
    new (): HTMLRhAccordianElement;
  };

  interface HTMLRhAppElement extends Components.RhApp, HTMLStencilElement {}
  var HTMLRhAppElement: {
    prototype: HTMLRhAppElement;
    new (): HTMLRhAppElement;
  };

  interface HTMLRhBadgesElement extends Components.RhBadges, HTMLStencilElement {}
  var HTMLRhBadgesElement: {
    prototype: HTMLRhBadgesElement;
    new (): HTMLRhBadgesElement;
  };

  interface HTMLRhBreadcrumbsElement extends Components.RhBreadcrumbs, HTMLStencilElement {}
  var HTMLRhBreadcrumbsElement: {
    prototype: HTMLRhBreadcrumbsElement;
    new (): HTMLRhBreadcrumbsElement;
  };

  interface HTMLRhCardElement extends Components.RhCard, HTMLStencilElement {}
  var HTMLRhCardElement: {
    prototype: HTMLRhCardElement;
    new (): HTMLRhCardElement;
  };

  interface HTMLRhCarouselSliderElement extends Components.RhCarouselSlider, HTMLStencilElement {}
  var HTMLRhCarouselSliderElement: {
    prototype: HTMLRhCarouselSliderElement;
    new (): HTMLRhCarouselSliderElement;
  };

  interface HTMLRhCheckboxElement extends Components.RhCheckbox, HTMLStencilElement {}
  var HTMLRhCheckboxElement: {
    prototype: HTMLRhCheckboxElement;
    new (): HTMLRhCheckboxElement;
  };

  interface HTMLRhDividerElement extends Components.RhDivider, HTMLStencilElement {}
  var HTMLRhDividerElement: {
    prototype: HTMLRhDividerElement;
    new (): HTMLRhDividerElement;
  };

  interface HTMLRhHeaderElement extends Components.RhHeader, HTMLStencilElement {}
  var HTMLRhHeaderElement: {
    prototype: HTMLRhHeaderElement;
    new (): HTMLRhHeaderElement;
  };

  interface HTMLRhHomeElement extends Components.RhHome, HTMLStencilElement {}
  var HTMLRhHomeElement: {
    prototype: HTMLRhHomeElement;
    new (): HTMLRhHomeElement;
  };

  interface HTMLRhIconElement extends Components.RhIcon, HTMLStencilElement {}
  var HTMLRhIconElement: {
    prototype: HTMLRhIconElement;
    new (): HTMLRhIconElement;
  };

  interface HTMLRhInputFieldDropdownElement extends Components.RhInputFieldDropdown, HTMLStencilElement {}
  var HTMLRhInputFieldDropdownElement: {
    prototype: HTMLRhInputFieldDropdownElement;
    new (): HTMLRhInputFieldDropdownElement;
  };

  interface HTMLRhListItemElement extends Components.RhListItem, HTMLStencilElement {}
  var HTMLRhListItemElement: {
    prototype: HTMLRhListItemElement;
    new (): HTMLRhListItemElement;
  };

  interface HTMLRhListItemBadgeElement extends Components.RhListItemBadge, HTMLStencilElement {}
  var HTMLRhListItemBadgeElement: {
    prototype: HTMLRhListItemBadgeElement;
    new (): HTMLRhListItemBadgeElement;
  };

  interface HTMLRhListItemCheckElement extends Components.RhListItemCheck, HTMLStencilElement {}
  var HTMLRhListItemCheckElement: {
    prototype: HTMLRhListItemCheckElement;
    new (): HTMLRhListItemCheckElement;
  };

  interface HTMLRhListItemPrimaryElement extends Components.RhListItemPrimary, HTMLStencilElement {}
  var HTMLRhListItemPrimaryElement: {
    prototype: HTMLRhListItemPrimaryElement;
    new (): HTMLRhListItemPrimaryElement;
  };

  interface HTMLRhLoaderElement extends Components.RhLoader, HTMLStencilElement {}
  var HTMLRhLoaderElement: {
    prototype: HTMLRhLoaderElement;
    new (): HTMLRhLoaderElement;
  };

  interface HTMLRhModalElement extends Components.RhModal, HTMLStencilElement {}
  var HTMLRhModalElement: {
    prototype: HTMLRhModalElement;
    new (): HTMLRhModalElement;
  };

  interface HTMLRhNavbarElement extends Components.RhNavbar, HTMLStencilElement {}
  var HTMLRhNavbarElement: {
    prototype: HTMLRhNavbarElement;
    new (): HTMLRhNavbarElement;
  };

  interface HTMLRhOnboardingElement extends Components.RhOnboarding, HTMLStencilElement {}
  var HTMLRhOnboardingElement: {
    prototype: HTMLRhOnboardingElement;
    new (): HTMLRhOnboardingElement;
  };

  interface HTMLRhPrimaryButtonElement extends Components.RhPrimaryButton, HTMLStencilElement {}
  var HTMLRhPrimaryButtonElement: {
    prototype: HTMLRhPrimaryButtonElement;
    new (): HTMLRhPrimaryButtonElement;
  };

  interface HTMLRhProgressBarElement extends Components.RhProgressBar, HTMLStencilElement {}
  var HTMLRhProgressBarElement: {
    prototype: HTMLRhProgressBarElement;
    new (): HTMLRhProgressBarElement;
  };

  interface HTMLRhRadioButtonsListElement extends Components.RhRadioButtonsList, HTMLStencilElement {}
  var HTMLRhRadioButtonsListElement: {
    prototype: HTMLRhRadioButtonsListElement;
    new (): HTMLRhRadioButtonsListElement;
  };

  interface HTMLRhResponsiveElement extends Components.RhResponsive, HTMLStencilElement {}
  var HTMLRhResponsiveElement: {
    prototype: HTMLRhResponsiveElement;
    new (): HTMLRhResponsiveElement;
  };

  interface HTMLRhSliderElement extends Components.RhSlider, HTMLStencilElement {}
  var HTMLRhSliderElement: {
    prototype: HTMLRhSliderElement;
    new (): HTMLRhSliderElement;
  };

  interface HTMLRhSlidingElement extends Components.RhSliding, HTMLStencilElement {}
  var HTMLRhSlidingElement: {
    prototype: HTMLRhSlidingElement;
    new (): HTMLRhSlidingElement;
  };

  interface HTMLRhTabElement extends Components.RhTab, HTMLStencilElement {}
  var HTMLRhTabElement: {
    prototype: HTMLRhTabElement;
    new (): HTMLRhTabElement;
  };

  interface HTMLRhTabContainerElement extends Components.RhTabContainer, HTMLStencilElement {}
  var HTMLRhTabContainerElement: {
    prototype: HTMLRhTabContainerElement;
    new (): HTMLRhTabContainerElement;
  };

  interface HTMLRhTextareaElement extends Components.RhTextarea, HTMLStencilElement {}
  var HTMLRhTextareaElement: {
    prototype: HTMLRhTextareaElement;
    new (): HTMLRhTextareaElement;
  };

  interface HTMLRhTextboxElement extends Components.RhTextbox, HTMLStencilElement {}
  var HTMLRhTextboxElement: {
    prototype: HTMLRhTextboxElement;
    new (): HTMLRhTextboxElement;
  };

  interface HTMLRhToggleSwitchElement extends Components.RhToggleSwitch, HTMLStencilElement {}
  var HTMLRhToggleSwitchElement: {
    prototype: HTMLRhToggleSwitchElement;
    new (): HTMLRhToggleSwitchElement;
  };

  interface HTMLShowcasesPageElement extends Components.ShowcasesPage, HTMLStencilElement {}
  var HTMLShowcasesPageElement: {
    prototype: HTMLShowcasesPageElement;
    new (): HTMLShowcasesPageElement;
  };

  interface HTMLTabPageElement extends Components.TabPage, HTMLStencilElement {}
  var HTMLTabPageElement: {
    prototype: HTMLTabPageElement;
    new (): HTMLTabPageElement;
  };
  interface HTMLElementTagNameMap {
    'accordian-page': HTMLAccordianPageElement;
    'badges-page': HTMLBadgesPageElement;
    'buttons-page': HTMLButtonsPageElement;
    'card-page': HTMLCardPageElement;
    'carousel-slider-page': HTMLCarouselSliderPageElement;
    'dividers-page': HTMLDividersPageElement;
    'form-page': HTMLFormPageElement;
    'headers-page': HTMLHeadersPageElement;
    'home-page': HTMLHomePageElement;
    'icon-label-navbars-page': HTMLIconLabelNavbarsPageElement;
    'icon-navbars-page': HTMLIconNavbarsPageElement;
    'label-navbars-page': HTMLLabelNavbarsPageElement;
    'list-items': HTMLListItemsElement;
    'loader-page': HTMLLoaderPageElement;
    'markdown-reader': HTMLMarkdownReaderElement;
    'modal-page': HTMLModalPageElement;
    'navbars-list-page': HTMLNavbarsListPageElement;
    'onboarding-page': HTMLOnboardingPageElement;
    'progress-bar-page': HTMLProgressBarPageElement;
    'rh-accordian': HTMLRhAccordianElement;
    'rh-app': HTMLRhAppElement;
    'rh-badges': HTMLRhBadgesElement;
    'rh-breadcrumbs': HTMLRhBreadcrumbsElement;
    'rh-card': HTMLRhCardElement;
    'rh-carousel-slider': HTMLRhCarouselSliderElement;
    'rh-checkbox': HTMLRhCheckboxElement;
    'rh-divider': HTMLRhDividerElement;
    'rh-header': HTMLRhHeaderElement;
    'rh-home': HTMLRhHomeElement;
    'rh-icon': HTMLRhIconElement;
    'rh-input-field-dropdown': HTMLRhInputFieldDropdownElement;
    'rh-list-item': HTMLRhListItemElement;
    'rh-list-item-badge': HTMLRhListItemBadgeElement;
    'rh-list-item-check': HTMLRhListItemCheckElement;
    'rh-list-item-primary': HTMLRhListItemPrimaryElement;
    'rh-loader': HTMLRhLoaderElement;
    'rh-modal': HTMLRhModalElement;
    'rh-navbar': HTMLRhNavbarElement;
    'rh-onboarding': HTMLRhOnboardingElement;
    'rh-primary-button': HTMLRhPrimaryButtonElement;
    'rh-progress-bar': HTMLRhProgressBarElement;
    'rh-radio-buttons-list': HTMLRhRadioButtonsListElement;
    'rh-responsive': HTMLRhResponsiveElement;
    'rh-slider': HTMLRhSliderElement;
    'rh-sliding': HTMLRhSlidingElement;
    'rh-tab': HTMLRhTabElement;
    'rh-tab-container': HTMLRhTabContainerElement;
    'rh-textarea': HTMLRhTextareaElement;
    'rh-textbox': HTMLRhTextboxElement;
    'rh-toggle-switch': HTMLRhToggleSwitchElement;
    'showcases-page': HTMLShowcasesPageElement;
    'tab-page': HTMLTabPageElement;
  }
}

declare namespace LocalJSX {
  interface AccordianPage extends JSXBase.HTMLAttributes<HTMLAccordianPageElement> {
    'history'?: RouterHistory;
  }
  interface BadgesPage extends JSXBase.HTMLAttributes<HTMLBadgesPageElement> {
    'history'?: RouterHistory;
  }
  interface ButtonsPage extends JSXBase.HTMLAttributes<HTMLButtonsPageElement> {
    'history'?: RouterHistory;
  }
  interface CardPage extends JSXBase.HTMLAttributes<HTMLCardPageElement> {
    'history'?: RouterHistory;
  }
  interface CarouselSliderPage extends JSXBase.HTMLAttributes<HTMLCarouselSliderPageElement> {
    'history'?: RouterHistory;
  }
  interface DividersPage extends JSXBase.HTMLAttributes<HTMLDividersPageElement> {
    'history'?: RouterHistory;
  }
  interface FormPage extends JSXBase.HTMLAttributes<HTMLFormPageElement> {
    'history'?: RouterHistory;
  }
  interface HeadersPage extends JSXBase.HTMLAttributes<HTMLHeadersPageElement> {
    'history'?: RouterHistory;
  }
  interface HomePage extends JSXBase.HTMLAttributes<HTMLHomePageElement> {
    'history'?: RouterHistory;
  }
  interface IconLabelNavbarsPage extends JSXBase.HTMLAttributes<HTMLIconLabelNavbarsPageElement> {
    'history'?: RouterHistory;
  }
  interface IconNavbarsPage extends JSXBase.HTMLAttributes<HTMLIconNavbarsPageElement> {
    'history'?: RouterHistory;
  }
  interface LabelNavbarsPage extends JSXBase.HTMLAttributes<HTMLLabelNavbarsPageElement> {
    'history'?: RouterHistory;
  }
  interface ListItems extends JSXBase.HTMLAttributes<HTMLListItemsElement> {
    'history'?: RouterHistory;
  }
  interface LoaderPage extends JSXBase.HTMLAttributes<HTMLLoaderPageElement> {
    'history'?: RouterHistory;
  }
  interface MarkdownReader extends JSXBase.HTMLAttributes<HTMLMarkdownReaderElement> {
    'history'?: RouterHistory;
  }
  interface ModalPage extends JSXBase.HTMLAttributes<HTMLModalPageElement> {
    'history'?: RouterHistory;
  }
  interface NavbarsListPage extends JSXBase.HTMLAttributes<HTMLNavbarsListPageElement> {
    'history'?: RouterHistory;
  }
  interface OnboardingPage extends JSXBase.HTMLAttributes<HTMLOnboardingPageElement> {
    'history'?: RouterHistory;
  }
  interface ProgressBarPage extends JSXBase.HTMLAttributes<HTMLProgressBarPageElement> {
    'history'?: RouterHistory;
  }
  interface RhAccordian extends JSXBase.HTMLAttributes<HTMLRhAccordianElement> {
    'accordions'?: Array<BasicAccordionModel>;
    'onOnClick'?: (event: CustomEvent<any>) => void;
  }
  interface RhApp extends JSXBase.HTMLAttributes<HTMLRhAppElement> {}
  interface RhBadges extends JSXBase.HTMLAttributes<HTMLRhBadgesElement> {
    'badgeBgColor'?: string;
    'badgeRound'?: boolean;
    'badgeStatus'?: string;
    'badgetitle'?: string;
    'onCheckEvent'?: (event: CustomEvent<any>) => void;
  }
  interface RhBreadcrumbs extends JSXBase.HTMLAttributes<HTMLRhBreadcrumbsElement> {
    'breadcrumbs'?: Array<string>;
    'onGoBack'?: (event: CustomEvent<any>) => void;
    'onGoBackTo'?: (event: CustomEvent<any>) => void;
  }
  interface RhCard extends JSXBase.HTMLAttributes<HTMLRhCardElement> {
    'carddescription'?: string;
    'cardsubtitle'?: string;
    'cardtitle'?: string;
  }
  interface RhCarouselSlider extends JSXBase.HTMLAttributes<HTMLRhCarouselSliderElement> {
    'carousels'?: Array<BasicCarouselModel>;
    'colorBg'?: string | 'transparent' | 'grey' | 'white';
    'padding'?: boolean;
  }
  interface RhCheckbox extends JSXBase.HTMLAttributes<HTMLRhCheckboxElement> {
    'checked'?: boolean;
    'disabled'?: boolean;
    'formController'?: ControlProperties;
    'isFormComponent'?: boolean;
    'left'?: boolean;
    'onChanged'?: (event: CustomEvent<any>) => void;
    'onOnChange'?: (event: CustomEvent<any>) => void;
    'padding'?: boolean;
    'text'?: string;
    'textError'?: string;
  }
  interface RhDivider extends JSXBase.HTMLAttributes<HTMLRhDividerElement> {
    'background'?: boolean;
    'bigSize'?: boolean;
    'fullWidth'?: boolean;
    'hrShow'?: boolean;
    'icon'?: string;
    'logoText'?: boolean;
    'onChecked'?: (event: CustomEvent<any>) => void;
    'padding'?: boolean;
    'text'?: string;
  }
  interface RhHeader extends JSXBase.HTMLAttributes<HTMLRhHeaderElement> {
    'backicon'?: boolean;
    'badgeActive'?: boolean;
    'badgeBgColor'?: string;
    'badgeStatus'?: string;
    'badgetitle'?: string;
    'deviceOnline'?: boolean;
    'headertitle'?: string;
    'icon'?: string;
    'innerpageheader'?: boolean;
    'onBackButtonAction'?: (event: CustomEvent<any>) => void;
    'onButtonAction'?: (event: CustomEvent<any>) => void;
    'righticon'?: boolean;
    'subtitle'?: string;
  }
  interface RhHome extends JSXBase.HTMLAttributes<HTMLRhHomeElement> {}
  interface RhIcon extends JSXBase.HTMLAttributes<HTMLRhIconElement> {
    'color'?: string;
    'name'?: string;
    'size'?: string;
  }
  interface RhInputFieldDropdown extends JSXBase.HTMLAttributes<HTMLRhInputFieldDropdownElement> {
    'elementlist'?: DropdownElement[];
    'formController'?: ControlProperties;
    'isFormComponent'?: boolean;
    'label'?: string;
    'onUpdate'?: (event: CustomEvent<InputDropdownEmit>) => void;
    'opened'?: boolean;
    'padding'?: boolean;
    'placeholder'?: string;
    'value'?: string;
  }
  interface RhListItem extends JSXBase.HTMLAttributes<HTMLRhListItemElement> {
    'itemList'?: Array<BasicListItem>;
    'onCheckEvent'?: (event: CustomEvent<any>) => void;
    'onStatusUpdate'?: (event: CustomEvent<any>) => void;
  }
  interface RhListItemBadge extends JSXBase.HTMLAttributes<HTMLRhListItemBadgeElement> {
    'badgeActive'?: boolean;
    'badgeBgColor'?: string;
    'badgeStatus'?: boolean;
    'badgetitle'?: string;
    'colorBg'?: string;
    'elements'?: string;
    'firstTitle'?: string;
    'icon'?: string;
    'iconLeftActive'?: boolean;
    'iconRight'?: boolean;
    'nested'?: boolean;
    'onCheckEvent'?: (event: CustomEvent<any>) => void;
    'onStatusUpdate'?: (event: CustomEvent<any>) => void;
    'padding'?: boolean;
    'status'?: boolean;
    'subtitle'?: string;
  }
  interface RhListItemCheck extends JSXBase.HTMLAttributes<HTMLRhListItemCheckElement> {
    'itemList'?: Array<ListItemVariation3>;
    'onCheckEvent'?: (event: CustomEvent<any>) => void;
    'onStatusUpdate'?: (event: CustomEvent<any>) => void;
  }
  interface RhListItemPrimary extends JSXBase.HTMLAttributes<HTMLRhListItemPrimaryElement> {
    'colorBg'?: string;
    'elements'?: string;
    'firstTitle'?: string;
    'icon'?: string;
    'iconRight'?: boolean;
    'nested'?: boolean;
    'onCheckEvent'?: (event: CustomEvent<any>) => void;
    'onStatusUpdate'?: (event: CustomEvent<any>) => void;
    'padding'?: boolean;
    'status'?: boolean;
    'subtitle'?: string;
  }
  interface RhLoader extends JSXBase.HTMLAttributes<HTMLRhLoaderElement> {}
  interface RhModal extends JSXBase.HTMLAttributes<HTMLRhModalElement> {
    'actionText'?: string;
    'modalHeader'?: string;
    'modalMessage'?: string;
  }
  interface RhNavbar extends JSXBase.HTMLAttributes<HTMLRhNavbarElement> {
    'onOnClick'?: (event: CustomEvent<any>) => void;
    'tabs'?: Array<HorizontalTabMenuModel>;
  }
  interface RhOnboarding extends JSXBase.HTMLAttributes<HTMLRhOnboardingElement> {
    'activeIndex'?: string;
    'boardingSteps'?: Array<OnBoardingModel>;
    'onClickHandle'?: (event: CustomEvent<any>) => void;
    'onNextAction'?: (event: CustomEvent<any>) => void;
    'onPrevAction'?: (event: CustomEvent<any>) => void;
    'progressValue'?: string;
  }
  interface RhPrimaryButton extends JSXBase.HTMLAttributes<HTMLRhPrimaryButtonElement> {
    'bgcolor'?: string;
    'color'?: string;
    'ctabutton'?: boolean;
    'disabled'?: boolean;
    'icon'?: string;
    'iconbutton'?: boolean;
    'iconsecondary'?: boolean;
    'onButtonClicked'?: (event: CustomEvent<any>) => void;
    'secondary'?: boolean;
    'standard'?: boolean;
    'text'?: string;
    'transparentbutton'?: boolean;
  }
  interface RhProgressBar extends JSXBase.HTMLAttributes<HTMLRhProgressBarElement> {
    'ProgressContentHidden'?: boolean;
    'progressAmount'?: string;
    'progressColor'?: string;
    'progressHeight'?: string;
    'progressWidth'?: string;
  }
  interface RhRadioButtonsList extends JSXBase.HTMLAttributes<HTMLRhRadioButtonsListElement> {
    'disabled'?: boolean;
    'formController'?: ControlProperties;
    'hasMargin'?: boolean;
    'inputTitle'?: string;
    'isFormComponent'?: boolean;
    'onChanged'?: (event: CustomEvent<ResultValidation>) => void;
    'onRadioCheck'?: (event: CustomEvent<any>) => void;
    'padding'?: boolean;
    'radioButtonList'?: RadioButton[];
    'radioPosition'?: string;
    'showDesktopCol'?: boolean;
  }
  interface RhResponsive extends JSXBase.HTMLAttributes<HTMLRhResponsiveElement> {
    'breakpoints'?: Breakpoints[];
  }
  interface RhSlider extends JSXBase.HTMLAttributes<HTMLRhSliderElement> {
    'colorBg'?: string | 'transparent' | 'grey' | 'white';
    'padding'?: boolean;
    'steps'?: Array<any>;
  }
  interface RhSliding extends JSXBase.HTMLAttributes<HTMLRhSlidingElement> {}
  interface RhTab extends JSXBase.HTMLAttributes<HTMLRhTabElement> {
    'tabname'?: string;
  }
  interface RhTabContainer extends JSXBase.HTMLAttributes<HTMLRhTabContainerElement> {}
  interface RhTextarea extends JSXBase.HTMLAttributes<HTMLRhTextareaElement> {
    'componentTitle'?: string;
    'maxLenght'?: number;
    'onUpdatedText'?: (event: CustomEvent<any>) => void;
    'padding'?: boolean;
    'placeholder'?: string;
    'text'?: string;
  }
  interface RhTextbox extends JSXBase.HTMLAttributes<HTMLRhTextboxElement> {
    'areResultscategorized'?: boolean;
    'calendarActive'?: boolean;
    'calendarHourActive'?: boolean;
    'dateDisable'?: Array<any>;
    'disabled'?: boolean;
    'error'?: boolean;
    'errorText'?: string;
    'formController'?: ControlProperties;
    'hourDisabled'?: Array<any>;
    'instructionText'?: string;
    'isFormComponent'?: boolean;
    'label'?: string;
    'mask'?: string;
    'maskActive'?: boolean;
    'maxDate'?: string;
    'maxHour'?: string;
    'maxlength'?: number;
    'minDate'?: string;
    'minHour'?: string;
    'ngModelVar'?: string;
    'onCheckEvent'?: (event: CustomEvent<any>) => void;
    'onEmitDate'?: (event: CustomEvent<any>) => void;
    'onEmitHour'?: (event: CustomEvent<any>) => void;
    'onOnFocus'?: (event: CustomEvent<any>) => void;
    'onUpdate'?: (event: CustomEvent<any>) => void;
    'padding'?: boolean;
    'placeholder'?: string;
    'setHour'?: string;
    'showCustomError'?: boolean;
    'showError'?: boolean;
    'sugestions'?: Array<string>;
    'sugestionsCatergories'?: Array<CategorizedResults>;
    'type'?: string;
  }
  interface RhToggleSwitch extends JSXBase.HTMLAttributes<HTMLRhToggleSwitchElement> {
    'border'?: boolean;
    'checked'?: boolean;
    'disabled'?: boolean;
    'leftText'?: string;
    'onSwitchClick'?: (event: CustomEvent<any>) => void;
    'rightText'?: string;
  }
  interface ShowcasesPage extends JSXBase.HTMLAttributes<HTMLShowcasesPageElement> {
    'history'?: RouterHistory;
  }
  interface TabPage extends JSXBase.HTMLAttributes<HTMLTabPageElement> {}

  interface IntrinsicElements {
    'accordian-page': AccordianPage;
    'badges-page': BadgesPage;
    'buttons-page': ButtonsPage;
    'card-page': CardPage;
    'carousel-slider-page': CarouselSliderPage;
    'dividers-page': DividersPage;
    'form-page': FormPage;
    'headers-page': HeadersPage;
    'home-page': HomePage;
    'icon-label-navbars-page': IconLabelNavbarsPage;
    'icon-navbars-page': IconNavbarsPage;
    'label-navbars-page': LabelNavbarsPage;
    'list-items': ListItems;
    'loader-page': LoaderPage;
    'markdown-reader': MarkdownReader;
    'modal-page': ModalPage;
    'navbars-list-page': NavbarsListPage;
    'onboarding-page': OnboardingPage;
    'progress-bar-page': ProgressBarPage;
    'rh-accordian': RhAccordian;
    'rh-app': RhApp;
    'rh-badges': RhBadges;
    'rh-breadcrumbs': RhBreadcrumbs;
    'rh-card': RhCard;
    'rh-carousel-slider': RhCarouselSlider;
    'rh-checkbox': RhCheckbox;
    'rh-divider': RhDivider;
    'rh-header': RhHeader;
    'rh-home': RhHome;
    'rh-icon': RhIcon;
    'rh-input-field-dropdown': RhInputFieldDropdown;
    'rh-list-item': RhListItem;
    'rh-list-item-badge': RhListItemBadge;
    'rh-list-item-check': RhListItemCheck;
    'rh-list-item-primary': RhListItemPrimary;
    'rh-loader': RhLoader;
    'rh-modal': RhModal;
    'rh-navbar': RhNavbar;
    'rh-onboarding': RhOnboarding;
    'rh-primary-button': RhPrimaryButton;
    'rh-progress-bar': RhProgressBar;
    'rh-radio-buttons-list': RhRadioButtonsList;
    'rh-responsive': RhResponsive;
    'rh-slider': RhSlider;
    'rh-sliding': RhSliding;
    'rh-tab': RhTab;
    'rh-tab-container': RhTabContainer;
    'rh-textarea': RhTextarea;
    'rh-textbox': RhTextbox;
    'rh-toggle-switch': RhToggleSwitch;
    'showcases-page': ShowcasesPage;
    'tab-page': TabPage;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}

