"use strict";
(self["webpackChunkng_able_pro"] = self["webpackChunkng_able_pro"] || []).push([["src_app_components_manage_manage_module_ts"],{

/***/ 34026:
/*!**************************************************************************!*\
  !*** ./src/app/components/manage/addnewcustom/addnewcustom.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddnewcustomComponent": () => (/* binding */ AddnewcustomComponent)
/* harmony export */ });
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/collections */ 89502);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/table */ 97217);
/* harmony import */ var src_app_models_ICustommodel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/models/ICustommodel */ 53707);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/authentication.service */ 7053);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var ng6_toastr_notifications__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng6-toastr-notifications */ 46196);
/* harmony import */ var src_app_login_claimshelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/login/claimshelper */ 68763);
/* harmony import */ var src_app_services_customfield_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/customfield.service */ 7723);
/* harmony import */ var _theme_shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../theme/shared/components/card/card.component */ 84631);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ 43365);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/select */ 91434);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/core */ 88133);


















function AddnewcustomComponent_mat_error_43_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Module is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function AddnewcustomComponent_mat_option_48_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-option", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const type_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", type_r10.Value);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](type_r10.Text);
} }
function AddnewcustomComponent_mat_option_53_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-option", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const type_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", type_r11.Value)("selected", type_r11.Selected);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](type_r11.Text);
} }
function AddnewcustomComponent_ng_container_66_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "input", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AddnewcustomComponent_ng_container_66_Template_input_ngModelChange_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r12.customdetails.DefaultValue = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx_r3.customdetails.DefaultValue);
} }
function AddnewcustomComponent_ng_container_67_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "input", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} }
function AddnewcustomComponent_mat_option_77_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-option", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const type_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", type_r14.Value);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](type_r14.Text);
} }
function AddnewcustomComponent_mat_form_field_78_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-form-field", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2, "MaxLength:");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "input", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AddnewcustomComponent_mat_form_field_78_Template_input_ngModelChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r15.customdetails.MaxLength = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx_r6.customdetails.MaxLength);
} }
function AddnewcustomComponent_mat_error_84_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "ColumnLabel is required");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function AddnewcustomComponent_app_card_89_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "label", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "Value:");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "input", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function AddnewcustomComponent_app_card_89_ng_container_9_Template_input_change_8_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r21); const i_r19 = restoredCtx.index; const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r20.textUpdate($event.target.value, i_r19); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "label", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11, " Default :");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "input", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function AddnewcustomComponent_app_card_89_ng_container_9_Template_input_change_12_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r21); const i_r19 = restoredCtx.index; const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r22.onChangeCheckbox($event.target.checked, i_r19); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "button", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AddnewcustomComponent_app_card_89_ng_container_9_Template_button_click_13_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r21); const i_r19 = restoredCtx.index; const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r23.DeleteContols(i_r19); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14, "Remove");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const i_r19 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formGroupName", i_r19);
} }
function AddnewcustomComponent_app_card_89_Template(rf, ctx) { if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "app-card", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "button", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AddnewcustomComponent_app_card_89_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r25); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r24.addcontoles(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "i", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "Add More Fields");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](7, 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](9, AddnewcustomComponent_app_card_89_ng_container_9_Template, 15, 1, "ng-container", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formGroup", ctx_r8.customTypeForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r8.lstCustomOptions.controls);
} }
function AddnewcustomComponent_app_card_90_th_4_Template(rf, ctx) { if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "input", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("change", function AddnewcustomComponent_app_card_90_th_4_Template_input_change_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r37); const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return $event ? ctx_r36.masterToggle() : null; });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("checked", ctx_r26.selection.hasValue() && ctx_r26.isAllSelected())("indeterminate", ctx_r26.selection.hasValue() && !ctx_r26.isAllSelected());
} }
function AddnewcustomComponent_app_card_90_td_5_Template(rf, ctx) { if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "input", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AddnewcustomComponent_app_card_90_td_5_Template_input_click_1_listener($event) { return $event.stopPropagation(); })("change", function AddnewcustomComponent_app_card_90_td_5_Template_input_change_1_listener($event) { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r41); const row_r38 = restoredCtx.$implicit; const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return $event ? ctx_r40.selection.toggle(row_r38) : null; })("click", function AddnewcustomComponent_app_card_90_td_5_Template_input_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r41); const row_r38 = restoredCtx.$implicit; const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r42.deleteMsg(row_r38); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const row_r38 = ctx.$implicit;
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("checked", ctx_r27.selection.isSelected(row_r38));
} }
function AddnewcustomComponent_app_card_90_th_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " DELETE ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function AddnewcustomComponent_app_card_90_td_8_Template(rf, ctx) { if (rf & 1) {
    const _r46 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "a", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "i", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AddnewcustomComponent_app_card_90_td_8_Template_i_click_2_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r46); const element_r43 = restoredCtx.$implicit; const i_r44 = restoredCtx.index; const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2); return ctx_r45.DeleteCustomOptionById(element_r43.DrpValueId, i_r44); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function AddnewcustomComponent_app_card_90_th_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Value ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function AddnewcustomComponent_app_card_90_td_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r47 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](element_r47.DrpValue);
} }
function AddnewcustomComponent_app_card_90_th_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "th", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " IsDefault");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} }
function AddnewcustomComponent_app_card_90_td_14_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "div");
} }
function AddnewcustomComponent_app_card_90_td_14_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "input", 80);
} if (rf & 2) {
    const element_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate"]("name", element_r48.IsDefault);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("checked", element_r48.IsDefault)("ngModel", element_r48.IsDefault);
} }
function AddnewcustomComponent_app_card_90_td_14_ng_template_4_Template(rf, ctx) { }
function AddnewcustomComponent_app_card_90_td_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "td", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, AddnewcustomComponent_app_card_90_td_14_div_1_Template, 1, 0, "div", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, AddnewcustomComponent_app_card_90_td_14_ng_template_2_Template, 1, 3, "ng-template", null, 78, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, AddnewcustomComponent_app_card_90_td_14_ng_template_4_Template, 0, 0, "ng-template", null, 79, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r48 = ctx.$implicit;
    const _r50 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](3);
    const _r52 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", element_r48.IsDefault || !element_r48.IsDefault)("ngIfThen", _r50)("ngIfElse", _r52);
} }
function AddnewcustomComponent_app_card_90_tr_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "tr", 81);
} }
function AddnewcustomComponent_app_card_90_tr_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "tr", 82);
} }
function AddnewcustomComponent_app_card_90_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "app-card", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "table", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](3, 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](4, AddnewcustomComponent_app_card_90_th_4_Template, 2, 2, "th", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](5, AddnewcustomComponent_app_card_90_td_5_Template, 2, 1, "td", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](6, 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](7, AddnewcustomComponent_app_card_90_th_7_Template, 2, 0, "th", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, AddnewcustomComponent_app_card_90_td_8_Template, 3, 0, "td", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](9, 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](10, AddnewcustomComponent_app_card_90_th_10_Template, 2, 0, "th", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](11, AddnewcustomComponent_app_card_90_td_11_Template, 3, 1, "td", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](12, 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, AddnewcustomComponent_app_card_90_th_13_Template, 2, 0, "th", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](14, AddnewcustomComponent_app_card_90_td_14_Template, 6, 3, "td", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](15, AddnewcustomComponent_app_card_90_tr_15_Template, 1, 0, "tr", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](16, AddnewcustomComponent_app_card_90_tr_16_Template, 1, 0, "tr", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("dataSource", ctx_r9.dataSource);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("matHeaderRowDef", ctx_r9.displayedColumns);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("matRowDefColumns", ctx_r9.displayedColumns);
} }
const _c0 = function () { return ["/CustomField/ViewCustomFields"]; };
class AddnewcustomComponent {
    constructor(sr, router, activated, toastr, claimsHelper, fb, customservice) {
        this.sr = sr;
        this.router = router;
        this.activated = activated;
        this.toastr = toastr;
        this.claimsHelper = claimsHelper;
        this.fb = fb;
        this.customservice = customservice;
        this.RequiredField = false;
        this.IsActive = false;
        this.IsShowInJoinNow = false;
        this.IsDefault = false;
        this.customdetails = new src_app_models_ICustommodel__WEBPACK_IMPORTED_MODULE_0__.ICustommodel();
        this.CustomOptionsDomainModel = [];
        this.submitted = false;
        //router: any;flag
        // module: any ='SelcetAll';
        // userid: any =1;
        // dataSource: any;
        this.IsCustomFieldAddOptions = false;
        this.displayedColumns = ['select', 'delete', 'username', 'email'];
        this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatTableDataSource();
        this.selection = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_7__.SelectionModel(true, []);
        this.modulename = JSON.parse(localStorage.getItem('customdetails') || '{}');
        this.userId = this.claimsHelper.GetUserIdAPIKeyFromClaims();
        ///// this columnID is taken based on order(LIFO) , if order change it will not work
        this.columnID = JSON.parse(localStorage.getItem('columnID') || '{}');
        //   console.log(this.dataSource.data.length);
        //   localStorage.setItem('columnID',JSON.stringify(this.dataSource.data.length))
        //  // )JSON.parse(localStorage.getItem('user')||'{}');
        this.activated.queryParamMap.subscribe((queryParam) => {
            debugger;
            this.customfieldId = queryParam.get("FieldidfrmView");
            this.ddlvalue = queryParam.get("module");
            this.Customstatus = queryParam.get("Type");
        });
    }
    ngOnInit() {
        debugger;
        this.customTypeForm = this.fb.group({
            Module: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required),
            ColumnId: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl(''),
            ActualColumnName: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl(''),
            ColumnLabel: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required),
            ColumnType: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl(''),
            ColumnDescription: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl(''),
            IsRequired: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl(''),
            MouseHoverText: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl(''),
            Status: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl(''),
            DefaultValue: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl(''),
            MaxLength: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl(''),
            lstCustomOptions: this.fb.array([])
        });
        if (this.Customstatus == "New") {
            this.customservice.GetcustomfiledtypeList(this.userId, this.ddlvalue).subscribe((response) => {
                var newcolid;
                if (response.length > 0) {
                    newcolid = response[0].Column_Id + 1;
                }
                else {
                    newcolid = 1;
                }
                this.customdetails.Module = this.ddlvalue;
                this.customdetails.Column_Id = newcolid;
                this.customdetails.ActualColumnName = `CustomField${newcolid}`;
                this.customdetails.Column_Type = "textbox";
                this.customdetails.IsActive = false;
            });
        }
        else if (this.Customstatus == "Edit") {
            debugger;
            this.customservice.GetcustomfiledListbyid(this.customfieldId).subscribe((res) => {
                this.customdetails = res;
                if (res.IsActive == false) {
                    this.customdetails.IsActive = false;
                }
                else {
                    this.customdetails.IsActive = true;
                }
                if (res.RequiredField == false) {
                    this.customdetails.RequiredField = false;
                }
                else {
                    this.customdetails.RequiredField = true;
                }
            });
        }
        this.ddlcolumntype = [
            { Value: "textbox", Text: "Text Box", Selected: true },
            { Value: "textarea", Text: "Text Area" },
            { Value: "numeric", Text: "Numeric" },
            { Value: "date", Text: "Date" },
            { Value: "checkbox", Text: "Check Box" },
            { Value: "radiobutton", Text: "Radio Button" },
            { Value: "dropdown", Text: "Drop Down" }
        ];
        this.ddlisrequired = [
            { Text: "YES", Value: true },
            { Text: "NO", Value: false, Selected: true },
        ];
        this.ddlstatus = [
            { Text: "Active", Value: true },
            { Text: "In-Active", Value: false, Selected: true }
        ];
        this.customTypeForm.get("Module").disable();
        this.customTypeForm.get("ColumnId").disable();
        this.customTypeForm.get("ActualColumnName").disable();
        this.GetcustomOptionsList();
    }
    get f() {
        return this.customTypeForm.controls;
    }
    get lstCustomOptions() {
        return this.customTypeForm.controls["lstCustomOptions"];
    }
    GetcustomOptionsList() {
        debugger;
        this.customservice.GetAllcustomoptions(this.customfieldId).subscribe((response) => {
            console.log(response);
            this.dataSource = response.lstCustomOptions;
            console.log(this.dataSource);
            if (response.lstCustomOptions.length != 0) {
                this.IsCustomFieldAddOptions = true;
            }
            else {
                this.IsCustomFieldAddOptions = false;
            }
        });
    }
    addcontoles() {
        debugger;
        this.lstCustomOptionsForm = this.fb.group({
            DrpValueId: [0],
            FieldId: [0],
            DrpValue: [''],
            IsDefault: [false],
            CreatedDate: [new Date()]
        });
        this.lstCustomOptions.push(this.lstCustomOptionsForm);
        this.customdetails.lstCustomOptions = (this.lstCustomOptions.value);
        console.log(this.customdetails.lstCustomOptions);
        console.log(this.customTypeForm.value.lstCustomOptions);
    }
    textUpdate(event, index) {
        debugger;
        this.customTypeForm.value.lstCustomOptions[index].DrpValue = event;
    }
    DeleteContols(index) {
        debugger;
        this.lstCustomOptions.removeAt(index);
    }
    onChangeCheckbox(event, index) {
        debugger;
        const lstCustomOptions = this.customTypeForm.get('lstCustomOptions');
        // Iterate through the controls and uncheck others
        lstCustomOptions.controls.forEach((control, i) => {
            debugger;
            control.get('IsDefault').setValue(i === index && event);
        });
    }
    onChangeCustom(event) {
        if (event.value == "checkbox" || event.value == "radiobutton" || event.value == "dropdown") {
            this.IsCustomFieldAddOptions = true;
            this.lstCustomOptions.clear();
        }
        else {
            this.IsCustomFieldAddOptions = false;
        }
    }
    Save() {
        this.submitted = true;
        if (this.customTypeForm.valid) {
            this.customdetails.UserID = this.userId;
            if (this.Customstatus == "New") {
                this.customdetails.flag = 1;
                this.customdetails.FieldId = 0;
                this.customdetails.DrpValueId = 0;
                var status = 'Created';
            }
            else if (this.Customstatus == "Edit") {
                this.customdetails.flag = 2;
                var status = 'Updated';
                if (this.customTypeForm.value.lstCustomOptions.length != 0) {
                    for (let i = 0; i < this.customTypeForm.value.lstCustomOptions.length; i++) {
                        this.customTypeForm.value.lstCustomOptions[i].FieldId = this.customdetails.FieldId;
                        this.customservice.Updatecustomoptions(this.customTypeForm.value.lstCustomOptions[i]).subscribe(() => { });
                    }
                }
            }
            this.customservice.Insertcustomfiled(this.customdetails).subscribe((res) => {
                if (res != 0) {
                    this.customdetails.FieldId = res;
                    for (let i = 0; i < this.customTypeForm.value.lstCustomOptions.length; i++) {
                        console.log(this.customTypeForm.value);
                        this.customTypeForm.value.lstCustomOptions[i].FieldId = this.customdetails.FieldId;
                        this.customservice.Updatecustomoptions(this.customTypeForm.value.lstCustomOptions[i]).subscribe(() => { });
                    }
                }
            });
            this.toastr.successToastr(`Custom Field(s) ${status}  Successfully.`, "success");
            this.router.navigate(['/CustomField/ViewCustomFields']);
        }
        else {
            return null;
        }
    }
    DeleteCustomOptionById(OptionById, index) {
        debugger;
        const result = confirm(`You are about to delete permanently.Are you sure you want to delete this Option?`);
        if (result) {
            this.customservice.Deletecustomoption(OptionById).subscribe((response) => {
                if (response) {
                    this.GetcustomOptionsList();
                    this.toastr.successToastr("Custom Filed Details Updated Successfully", "success");
                }
            });
        }
    }
}
AddnewcustomComponent.ɵfac = function AddnewcustomComponent_Factory(t) { return new (t || AddnewcustomComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__.AuthenticationService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](ng6_toastr_notifications__WEBPACK_IMPORTED_MODULE_10__.ToastrManager), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_login_claimshelper__WEBPACK_IMPORTED_MODULE_2__.ClaimsHelper), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_services_customfield_service__WEBPACK_IMPORTED_MODULE_3__.CustomfieldService)); };
AddnewcustomComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: AddnewcustomComponent, selectors: [["app-addnewcustom"]], decls: 91, vars: 22, consts: [[1, "page-header"], [1, "page-block"], [1, "row", "align-items-center"], [1, "col-sm-12"], [1, "page-header-title"], [1, "m-b-10"], [1, "breadcrumb"], [1, "breadcrumb-item"], ["href", "index.html"], [1, "feather", "icon-home"], [1, "row", "btn-page"], ["title", "Custom Field Detail", "cardTitle", "Custom Field Detail"], [1, "row"], [1, "float-right", "mb-3"], ["type", "button", "id", "btnSave", 1, "btn", "btn-sm", "btn-round", "waves-effect", "waves-light", "btn-success", 3, "click"], [1, "fa", "fa-save", "pr-1"], [1, "btn", "btn-sm", "btn-round", "waves-effect", "waves-light", "btn-success", 3, "routerLink"], [1, "fa", "fa-backward", "pr-1"], [3, "formGroup"], ["cardTitle", "Create New Customer "], [1, "col-sm-3"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "Module", "placeholder", "Module", "required", "", 3, "ngModel", "ngModelChange"], [4, "ngIf"], ["formControlName", "ColumnType", 3, "ngModel", "ngModelChange", "selectionChange"], [3, "value", 4, "ngFor", "ngForOf"], ["id", "Country", "name", "Status", "formControlName", "Status", 3, "ngModel", "ngModelChange"], [3, "value", "selected", 4, "ngFor", "ngForOf"], ["matInput", "", "formControlName", "ColumnId", 3, "ngModel", "ngModelChange"], ["matInput", "", "formControlName", "ColumnDescription", 3, "ngModel", "ngModelChange"], ["matInput", "", "formControlName", "ActualColumnName", 3, "ngModel", "ngModelChange"], ["id", "Country", "formControlName", "IsRequired", 3, "ngModel", "ngModelChange"], ["class", "full-width", "appearance", "outline", 4, "ngIf"], ["matInput", "", "formControlName", "ColumnLabel", "required", "", 3, "ngModel", "ngModelChange"], ["matInput", "", "formControlName", "MouseHoverText", 3, "ngModel", "ngModelChange"], ["title", "Custom Field Add Options", "cardTitle", "Custom Field Add Options", 4, "ngIf"], ["title", "Custom Field Options List", "cardTitle", "Custom Field Options List", 4, "ngIf"], [3, "value"], [3, "value", "selected"], ["matInput", "", "formControlName", "DefaultValue", 3, "ngModel", "ngModelChange"], ["matInput", "", "type", "date", "formControlName", "DefaultValue"], ["matInput", "", "formControlName", "MaxLength", 3, "ngModel", "ngModelChange"], ["title", "Custom Field Add Options", "cardTitle", "Custom Field Add Options"], [1, "btn", "btn-success", "btn-sm", "btn-round", "has-ripple", "waves-effect", "waves-light", "float-right", 3, "click"], [1, "fa", "fa-circle-plus", "pr-1"], ["formArrayName", "lstCustomOptions"], [1, "row", "mt-2"], [4, "ngFor", "ngForOf"], [1, "col-sm-6", 3, "formGroupName"], [1, "col-md-12", "d-flex"], [1, "col-sm-7", "d-flex", "form-group"], ["for", "value", 1, "col-form-label"], [1, "input-group", "pl-2"], ["type", "text", "formControlName", "DrpValue", 1, "form-control", 3, "change"], [1, "col-sm-5"], ["for", "Default", 1, "col-form-label", "pr-2"], ["type", "checkbox", "formControlName", "IsDefault", "value", "true", 3, "change"], ["type", "button", 1, "btn", "btn-sm", "btn-danger", "float-right", 3, "click"], ["title", "Custom Field Options List", "cardTitle", "Custom Field Options List"], [1, "table-responsive"], ["mat-table", "", 1, "table", "mb-2", 3, "dataSource"], ["matColumnDef", "select"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "delete"], ["mat-header-cell", "", "class", "sorting sorting_asc", "mat-sort-header", "delete", 4, "matHeaderCellDef"], ["matColumnDef", "username"], ["matColumnDef", "email"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", "class", "example-element-row", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["type", "checkbox", 3, "checked", "indeterminate", "change"], ["mat-cell", ""], ["type", "checkbox", 3, "checked", "click", "change"], ["mat-header-cell", "", "mat-sort-header", "delete", 1, "sorting", "sorting_asc"], ["href", "javascript:", 1, "btn", "btn-danger", "btn-sm", "has-ripple", "waves-effect", "waves-light"], [1, "feather", "icon-trash-2", "text-white", 3, "click"], [4, "ngIf", "ngIfThen", "ngIfElse"], ["content", ""], ["other_content", ""], ["disabled", "disabled", "type", "checkbox", 1, "check-box", 3, "checked", "name", "ngModel"], ["mat-header-row", ""], ["mat-row", "", 1, "example-element-row"]], template: function AddnewcustomComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "h5", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "Add New Custom Field");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "ul", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](10, "i", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13, "Manage");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](16, "Custom Fields");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](19, "Add New Custom Field");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](21, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "app-card", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](26, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AddnewcustomComponent_Template_button_click_26_listener() { return ctx.Save(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](27, "i", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](28, "Save ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](29, "\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](30, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](31, "i", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](32, "Back ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](33, "form", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](34, "app-card", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](35, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](36, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](37, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](38, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](39, "mat-form-field", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](40, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](41, "Module:");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](42, "input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AddnewcustomComponent_Template_input_ngModelChange_42_listener($event) { return ctx.customdetails.Module = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](43, AddnewcustomComponent_mat_error_43_Template, 2, 0, "mat-error", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](44, "mat-form-field", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](45, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](46, "Column Type:");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](47, "mat-select", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AddnewcustomComponent_Template_mat_select_ngModelChange_47_listener($event) { return ctx.customdetails.Column_Type = $event; })("selectionChange", function AddnewcustomComponent_Template_mat_select_selectionChange_47_listener($event) { return ctx.onChangeCustom($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](48, AddnewcustomComponent_mat_option_48_Template, 2, 2, "mat-option", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](49, "mat-form-field", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](50, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](51, "Status:");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](52, "mat-select", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AddnewcustomComponent_Template_mat_select_ngModelChange_52_listener($event) { return ctx.customdetails.IsActive = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](53, AddnewcustomComponent_mat_option_53_Template, 2, 3, "mat-option", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](54, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](55, "mat-form-field", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](56, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](57, "Column Id:");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](58, "input", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AddnewcustomComponent_Template_input_ngModelChange_58_listener($event) { return ctx.customdetails.Column_Id = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](59, "mat-form-field", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](60, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](61, "Column Description:");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](62, "input", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AddnewcustomComponent_Template_input_ngModelChange_62_listener($event) { return ctx.customdetails.Column_Description = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](63, "mat-form-field", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](64, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](65, "Default Value:");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](66, AddnewcustomComponent_ng_container_66_Template, 2, 1, "ng-container", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](67, AddnewcustomComponent_ng_container_67_Template, 2, 0, "ng-container", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](68, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](69, "mat-form-field", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](70, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](71, "Actual Column Name:");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](72, "input", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AddnewcustomComponent_Template_input_ngModelChange_72_listener($event) { return ctx.customdetails.ActualColumnName = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](73, "mat-form-field", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](74, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](75, "Is Required:");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](76, "mat-select", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AddnewcustomComponent_Template_mat_select_ngModelChange_76_listener($event) { return ctx.customdetails.RequiredField = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](77, AddnewcustomComponent_mat_option_77_Template, 2, 2, "mat-option", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](78, AddnewcustomComponent_mat_form_field_78_Template, 4, 1, "mat-form-field", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](79, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](80, "mat-form-field", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](81, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](82, "Column Label:");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](83, "input", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AddnewcustomComponent_Template_input_ngModelChange_83_listener($event) { return ctx.customdetails.Column_Label = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](84, AddnewcustomComponent_mat_error_84_Template, 2, 0, "mat-error", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](85, "mat-form-field", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](86, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](87, "Mouse Hover Text:");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](88, "input", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AddnewcustomComponent_Template_input_ngModelChange_88_listener($event) { return ctx.customdetails.HoverText = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](89, AddnewcustomComponent_app_card_89_Template, 10, 2, "app-card", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](90, AddnewcustomComponent_app_card_90_Template, 17, 3, "app-card", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](30);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction0"](21, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formGroup", ctx.customTypeForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx.customdetails.Module);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.f["Module"].errors);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx.customdetails.Column_Type);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.ddlcolumntype);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx.customdetails.IsActive);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.ddlstatus);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx.customdetails.Column_Id);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx.customdetails.Column_Description);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.customdetails.Column_Type != "date");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.customdetails.Column_Type == "date");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx.customdetails.ActualColumnName);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx.customdetails.RequiredField);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.ddlisrequired);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.customdetails.Column_Type != "date");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx.customdetails.Column_Label);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.submitted && ctx.f["ColumnLabel"].errors);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx.customdetails.HoverText);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.IsCustomFieldAddOptions);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.IsCustomFieldAddOptions);
    } }, directives: [_theme_shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_4__.CardComponent, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_8__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroupDirective, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_12__.MatInput, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.RequiredValidator, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatError, _angular_material_select__WEBPACK_IMPORTED_MODULE_14__.MatSelect, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _angular_material_core__WEBPACK_IMPORTED_MODULE_15__.MatOption, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormArrayName, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroupName, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.CheckboxControlValueAccessor, _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatCell, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgModel, _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_6__.MatRow], styles: [".mat-input-element[_ngcontent-%COMP%] {\n  width: 86% !important;\n}\n\n.m-b-10[_ngcontent-%COMP%] {\n  color: white;\n  font-weight: 400;\n}\n\n.button[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.spinner-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #fafafa;\n  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);\n}\n\n.mat-header-cell[_ngcontent-%COMP%] {\n  font-size: revert;\n  font-weight: bold;\n  color: #fff;\n  background: #ecf0f5;\n  color: black;\n  row-gap: 50px;\n  margin-bottom: 10%;\n  outline: none;\n  border-collapse: separate;\n  text-indent: initial;\n  border-spacing: 2px;\n  vertical-align: middle;\n  border-radius: 5px;\n  font-family: \"Open Sans\", sans-serif;\n  border-top: 1px solid #e2e5e8;\n  display: table-cell;\n}\n\n.mat-cell[_ngcontent-%COMP%] {\n  padding: 1.05rem 0.75rem;\n  border-color: #e2e5e8;\n}\n\n.mat-accordion[_ngcontent-%COMP%] {\n  padding: 10px !important;\n}\n\n.collapse[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.mat-select[_ngcontent-%COMP%] {\n  width: 80% !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZG5ld2N1c3RvbS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQTtFQUNJLHFCQUFBO0FBUEo7O0FBV0E7RUFDSSxZQUFBO0VBQ0EsZ0JBQUE7QUFSSjs7QUFVQTtFQUNJLGtCQUFBO0FBUEo7O0FBU0E7RUFDSSxXQUFBO0FBTko7O0FBUUU7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EscUhBQUE7QUFMSjs7QUFPQTtFQUNJLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLHlCQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQ0FBQTtFQUNBLDZCQUFBO0VBRUEsbUJBQUE7QUFMSjs7QUFVQTtFQUNJLHdCQUFBO0VBQ0EscUJBQUE7QUFQSjs7QUFVQztFQUNHLHdCQUFBO0FBUEo7O0FBU0E7RUFDSSxhQUFBO0FBTko7O0FBUUE7RUFDSSxxQkFBQTtBQUxKIiwiZmlsZSI6ImFkZG5ld2N1c3RvbS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4vLyAudGV4dC1yaWdodC1zbSB7XHJcbi8vICAgICB0ZXh0LWFsaWduOiByaWdodDtcclxuLy8gICAgIG1hcmdpbi1sZWZ0OiA2MCU7XHJcbi8vICAgICBtYXJnaW4tYm90dG9tOiAtMXB4O1xyXG4gICAgXHJcbi8vIH1cclxuXHJcbi5tYXQtaW5wdXQtZWxlbWVudCB7XHJcbiAgICB3aWR0aDogODYlICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcblxyXG4ubS1iLTEwe1xyXG4gICAgY29sb3I6d2hpdGU7XHJcbiAgICBmb250LXdlaWdodDogNDAwO1xyXG59XHJcbi5idXR0b257XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxudGFibGUge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG4gIC5zcGlubmVyLWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcclxuICAgIGJveC1zaGFkb3c6MCA1cHggNXB4IC0zcHggcmdiYSgwLDAsMCwuMiksIDAgOHB4IDEwcHggMXB4IHJnYmEoMCwwLDAsLjE0KSwgMCAzcHggMTRweCAycHggcmdiYSgwLDAsMCwuMTIpXHJcbiAgfVxyXG4ubWF0LWhlYWRlci1jZWxse1xyXG4gICAgZm9udC1zaXplOiByZXZlcnQ7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgYmFja2dyb3VuZDogI2VjZjBmNTs7XHJcbiAgICBjb2xvcjpibGFjaztcclxuICAgIHJvdy1nYXA6IDUwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMCU7XHJcbiAgICBvdXRsaW5lOm5vbmU7XHJcbiAgICBib3JkZXItY29sbGFwc2U6IHNlcGFyYXRlO1xyXG4gICAgdGV4dC1pbmRlbnQ6IGluaXRpYWw7XHJcbiAgICBib3JkZXItc3BhY2luZzogMnB4O1xyXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgIGZvbnQtZmFtaWx5OiBcIk9wZW4gU2Fuc1wiLCBzYW5zLXNlcmlmO1xyXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlMmU1ZTg7XHJcblxyXG4gICAgZGlzcGxheTogdGFibGUtY2VsbDtcclxuICAgIFxyXG59XHJcblxyXG5cclxuLm1hdC1jZWxsIHtcclxuICAgIHBhZGRpbmc6IDEuMDVyZW0gMC43NXJlbTtcclxuICAgIGJvcmRlci1jb2xvcjogI2UyZTVlODtcclxuICAgIFxyXG59XHJcbiAubWF0LWFjY29yZGlvbiB7XHJcbiAgICBwYWRkaW5nOiAxMHB4ICFpbXBvcnRhbnQ7XHJcbn1cclxuLmNvbGxhcHNlIHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuLm1hdC1zZWxlY3R7XHJcbiAgICB3aWR0aDogODAlICAhaW1wb3J0YW50O1xyXG59XHJcbiJdfQ== */"] });


/***/ }),

/***/ 19229:
/*!**************************************************************************!*\
  !*** ./src/app/components/manage/customfields/customfields.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CustomfieldsComponent": () => (/* binding */ CustomfieldsComponent)
/* harmony export */ });
/* harmony import */ var src_app_error_bad_input_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/error/bad-input-error */ 87663);
/* harmony import */ var src_app_error_not_found_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/error/not-found-error */ 69731);
/* harmony import */ var sweetalert2_dist_sweetalert2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2/dist/sweetalert2.js */ 59453);
/* harmony import */ var sweetalert2_dist_sweetalert2_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2_dist_sweetalert2_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var ng6_toastr_notifications__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng6-toastr-notifications */ 46196);
/* harmony import */ var src_app_services_customfield_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/customfield.service */ 7723);
/* harmony import */ var src_app_login_claimshelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/login/claimshelper */ 68763);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-spinner */ 63947);
/* harmony import */ var _theme_shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../theme/shared/components/card/card.component */ 84631);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/form-field */ 44770);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/select */ 91434);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/core */ 88133);
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ag-grid-angular */ 79771);
















function CustomfieldsComponent_mat_option_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "mat-option", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const type_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpropertyInterpolate"]("value", type_r1.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", type_r1.display, " ");
} }
class CustomfieldsComponent {
    constructor(router, toastr, customservice, claimsHelper, formBuilder, spinner) {
        this.router = router;
        this.toastr = toastr;
        this.customservice = customservice;
        this.claimsHelper = claimsHelper;
        this.formBuilder = formBuilder;
        this.spinner = spinner;
        this.module = "SelectAll";
        this.userid = 1;
        this.columnDefs = [
            { headerCheckboxSelection: true, checkboxSelection: true, width: 50 },
            { headerName: 'MODULE', field: 'Module', width: 150, headerClass: 'custom-header', },
            { headerName: 'ColumnID', field: 'Column_Id', width: 140 },
            { headerName: 'Column_Label', field: 'Column_Label', width: 170 },
            { headerName: 'Column_Description', field: 'Column_Description', width: 170 },
            { headerName: 'ActualColumnName', field: 'ActualColumnName', width: 150 },
            { headerName: 'Column_Type', field: 'Column_Type', width: 150 },
            { headerName: 'IsActive', field: 'IsActive', width: 130 },
        ];
        this.defaultColDef = {
            sortable: true,
            filter: true,
        };
        this.rowData = [];
        this.filterTypes = [
            { value: 'SelectAll', display: '--Select--' },
            { value: 'company', display: 'Company' },
            { value: 'Contact', display: 'Contacts' },
            { value: 'leads', display: 'Leads' },
            { value: 'Opportunities', display: 'Opportunities' },
        ];
        this.marked = false;
        this.checkedrowdata = [];
        this.userid = this.claimsHelper.GetUserIdAPIKeyFromClaims();
    }
    ngOnInit() {
        this.gridOptions = {
            columnDefs: this.columnDefs,
            defaultColDef: this.defaultColDef,
            paginationPageSize: 10,
            pagination: true,
            onRowSelected: this.activeInActiveToggle.bind(this),
            rowSelection: 'multiple',
            rowMultiSelectWithClick: true, // 
        };
        this.getCustomField(this.userid, this.module);
    }
    drpselected(event) {
        this.getCustomField(this.userid, event);
    }
    activeInActiveToggle(event) {
        this.marked = event.event.target.checked;
        if (this.marked == true) {
            this.checkedrowdata.push(event.node.data.FieldId);
        }
        else {
            let index = this.checkedrowdata.findIndex(item => item == event.node.data.FieldId);
            if (index !== -1) {
                this.checkedrowdata.splice(index, 1);
            }
        }
    }
    getCustomField(userid, module) {
        this.spinner.show();
        this.customservice.GetcustomfiledtypeList(this.userid, module).subscribe((data) => {
            this.spinner.hide();
            this.rowData = data;
        }, (err) => {
            this.spinner.hide();
            if (err instanceof src_app_error_bad_input_error__WEBPACK_IMPORTED_MODULE_0__.BadInputError) {
                window.alert("Bad Request:" + err.originalError);
            }
            else if (err instanceof src_app_error_not_found_error__WEBPACK_IMPORTED_MODULE_1__.NotFoundError) {
                window.alert("404 Error Occured!");
            }
            else {
                window.alert("An unexpected Error Occured!");
            }
        });
    }
    addCustom() {
        debugger;
        if (this.module != 'SelectAll') {
            this.router.navigate(['/CustomField/AddEditCustomFields'], { queryParams: { module: this.module, Type: 'New' } });
        }
        else {
            this.toastr.warningToastr('Please Select Module', "warning");
        }
    }
    getCustomFieldDetails() {
        debugger;
        this.customservice.GetcustomfiledListbyid(this.FieldID).subscribe(res => { console.log(res); });
    }
    InActiveCustom() {
        if (this.checkedrowdata.length == 0) {
            this.toastr.errorToastr("Please select item(s) to In-Activate.", "error");
        }
        else {
            let result = confirm('You are about to Inactivate the Custom field .Are you sure you want to inactivate the field ?');
            if (result) {
                this.customservice.UpdatecustomfieldstatusByIds(this.checkedrowdata).subscribe(res => {
                    if (res == true) {
                        this.toastr.successToastr("CustomField Status has been Changed Successfully.", "success", {
                            timeOut: 1000
                        });
                    }
                    else if (res == false) {
                        this.toastr.errorToastr("It is already in in-active.", "failed", {
                            timeOut: 3000
                        });
                    }
                    else {
                        this.toastr.errorToastr("CustomField Status Can't  Changed  !!!.", "Failed!", {
                            timeOut: 3000
                        });
                    }
                    this.checkedrowdata = [];
                    this.getCustomField(this.userid, this.module);
                });
            }
        }
    }
    Deleteuser() {
        if (this.marked == true || this.checkedrowdata.length != 0) {
            this.customservice.DeletecustomfieldByIds(this.checkedrowdata).subscribe(res => {
                this.checkedrowdata = [];
                if (res == true) {
                    this.marked = false;
                    this.getCustomField(this.userid, this.module);
                    this.toastr.successToastr("CustomField deleted Successfully.", "success", {
                        timeOut: 3000
                    });
                }
                else if (res == false) {
                    this.marked = false;
                    this.getCustomField(this.userid, this.module);
                    this.toastr.errorToastr("Can't delete.", "failed", {
                        timeOut: 3000
                    });
                }
                else {
                    this.toastr.errorToastr("CustomField Delete Failed  !!!.", "Failed!", {
                        timeOut: 3000
                    });
                }
            });
        }
        else {
            this.titleforpopup = 'Please select record to delete !';
            this.textforpopup = '';
            this.Swa1alerts('delete', this.titleforpopup, this.textforpopup);
        }
    }
    Swa1alerts(type, title, text) {
        sweetalert2_dist_sweetalert2_js__WEBPACK_IMPORTED_MODULE_2___default().fire({
            title: `<span style=" font-weight: normal;">${title}</span>`,
            text: text,
            backdrop: false,
            imageUrl: '',
            reverseButtons: true,
            showCancelButton: false,
            cancelButtonColor: '#ef4d4d',
            confirmButtonColor: '#448aff',
        }).then((result) => {
            if (result.value) {
            }
            else {
            }
        });
    }
    onCellClicked(event) {
        if (event.column.colId === 'Module') {
            this.router.navigate(['/CustomField/AddEditCustomFields'], { queryParams: { FieldidfrmView: event.data.FieldId, Type: 'Edit' } }).then((nav) => { console.log(nav); });
        }
    }
}
CustomfieldsComponent.ɵfac = function CustomfieldsComponent_Factory(t) { return new (t || CustomfieldsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](ng6_toastr_notifications__WEBPACK_IMPORTED_MODULE_8__.ToastrManager), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_services_customfield_service__WEBPACK_IMPORTED_MODULE_3__.CustomfieldService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_login_claimshelper__WEBPACK_IMPORTED_MODULE_4__.ClaimsHelper), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](ngx_spinner__WEBPACK_IMPORTED_MODULE_10__.NgxSpinnerService)); };
CustomfieldsComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: CustomfieldsComponent, selectors: [["app-customfields"]], decls: 42, vars: 5, consts: [[1, "page-header"], [1, "page-block"], [1, "row", "align-items-center"], [1, "col-sm-12"], [1, "page-header-title"], [1, "m-b-10"], [1, "breadcrumb"], [1, "breadcrumb-item"], ["href", "index.html"], [1, "feather", "icon-home"], [1, "row", "btn-page"], ["cardTitle", "Custom Fields"], [1, "row"], [1, "col-sm-4"], ["appearance", "outline", 1, "full-width"], [3, "ngModel", "ngModelChange", "selectionChange"], [3, "value", 4, "ngFor", "ngForOf"], [1, "col-sm-8"], [1, "float-right", "mb-3"], [1, "btn", "btn-success", "btn-sm", "btn-round", "has-ripple", "waves-effect", "waves-light", 3, "click"], [1, "pr-1"], [1, "fa", "fa-plus-circle", "pr-1"], [1, "icon", "fa", "fa-trash", "pr-1"], [1, "ag-theme-alpine", 2, "height", "535px", 3, "gridOptions", "rowData", "columnDefs", "cellClicked"], [3, "value"]], template: function CustomfieldsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "h5", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "Custom Fields");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "ul", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](10, "i", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13, "Manage");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16, "Custom Fields");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "app-card", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](21, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "mat-form-field", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](23, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](24, "Select an option");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](25, "mat-select", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function CustomfieldsComponent_Template_mat_select_ngModelChange_25_listener($event) { return ctx.module = $event; })("selectionChange", function CustomfieldsComponent_Template_mat_select_selectionChange_25_listener($event) { return ctx.drpselected($event.value); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](26, CustomfieldsComponent_mat_option_26_Template, 2, 2, "mat-option", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](27, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](28, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](29, "button", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function CustomfieldsComponent_Template_button_click_29_listener() { return ctx.InActiveCustom(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](30, "i", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](31, "In-Activate ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](32, "\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](33, "button", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function CustomfieldsComponent_Template_button_click_33_listener() { return ctx.addCustom(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](34, "i", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](35, "Add Data ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](36, "\u00A0 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](37, "button", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function CustomfieldsComponent_Template_button_click_37_listener() { return ctx.Deleteuser(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](38, "i", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](39, "Delete ");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](40, "app-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](41, "ag-grid-angular", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("cellClicked", function CustomfieldsComponent_Template_ag_grid_angular_cellClicked_41_listener($event) { return ctx.onCellClicked($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](25);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx.module);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.filterTypes);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("gridOptions", ctx.gridOptions)("rowData", ctx.rowData)("columnDefs", ctx.columnDefs);
    } }, directives: [_theme_shared_components_card_card_component__WEBPACK_IMPORTED_MODULE_5__.CardComponent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatLabel, _angular_material_select__WEBPACK_IMPORTED_MODULE_12__.MatSelect, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _angular_material_core__WEBPACK_IMPORTED_MODULE_14__.MatOption, ag_grid_angular__WEBPACK_IMPORTED_MODULE_15__.AgGridAngular], styles: [".ag-theme-alpine[_ngcontent-%COMP%] {\n  --ag-foreground-color: rgb(126, 46, 132);\n  --ag-background-color: rgb(249, 245, 227);\n  --ag-header-foreground-color: rgb(204, 245, 172);\n  --ag-header-background-color: rgb(209, 64, 129);\n  --ag-odd-row-background-color: rgb(0, 0, 0, 0.03);\n  --ag-header-column-resize-handle-color: rgb(126, 46, 132);\n  --ag-font-size: 17px;\n  --ag-font-family: monospace;\n}\n\n\n\n.custom-button[_ngcontent-%COMP%] {\n  background-color: #007bff;\n  \n  color: #fff;\n  \n  border: none;\n  \n  padding: 10px 20px;\n  \n  border-radius: 5px;\n  \n  cursor: pointer;\n  \n}\n\n\n\n.ag-header[_ngcontent-%COMP%]   .custom-header[_ngcontent-%COMP%] {\n  background-color: #ff9900 !important;\n}\n\n.mat-select[_ngcontent-%COMP%] {\n  width: 80% !important;\n}\n\n.mat-form-field[_ngcontent-%COMP%] {\n  width: 50%;\n  display: block !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN1c3RvbWZpZWxkcy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtFQUNFLHdDQUFBO0VBQ0EseUNBQUE7RUFDQSxnREFBQTtFQUNBLCtDQUFBO0VBQ0EsaURBQUE7RUFDQSx5REFBQTtFQUVBLG9CQUFBO0VBQ0EsMkJBQUE7QUFIRjs7QUFLQSxlQUFBOztBQUNBO0VBQ0EseUJBQUE7RUFBMkIsc0NBQUE7RUFDM0IsV0FBQTtFQUFhLHlCQUFBO0VBQ2IsWUFBQTtFQUFjLGlDQUFBO0VBQ2Qsa0JBQUE7RUFBb0IsNkNBQUE7RUFDcEIsa0JBQUE7RUFBb0Isd0JBQUE7RUFDcEIsZUFBQTtFQUFpQiwyQkFBQTtBQUlqQjs7QUFBQSx5QkFBQTs7QUFDQTtFQUNFLG9DQUFBO0FBR0Y7O0FBREE7RUFDRSxxQkFBQTtBQUlGOztBQUZBO0VBQ0UsVUFBQTtFQUNBLHlCQUFBO0FBS0YiLCJmaWxlIjoiY3VzdG9tZmllbGRzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5cclxuLmFnLXRoZW1lLWFscGluZSB7XHJcbiAgLS1hZy1mb3JlZ3JvdW5kLWNvbG9yOiByZ2IoMTI2LCA0NiwgMTMyKTtcclxuICAtLWFnLWJhY2tncm91bmQtY29sb3I6IHJnYigyNDksIDI0NSwgMjI3KTtcclxuICAtLWFnLWhlYWRlci1mb3JlZ3JvdW5kLWNvbG9yOiByZ2IoMjA0LCAyNDUsIDE3Mik7XHJcbiAgLS1hZy1oZWFkZXItYmFja2dyb3VuZC1jb2xvcjogcmdiKDIwOSwgNjQsIDEyOSk7XHJcbiAgLS1hZy1vZGQtcm93LWJhY2tncm91bmQtY29sb3I6IHJnYigwLCAwLCAwLCAwLjAzKTtcclxuICAtLWFnLWhlYWRlci1jb2x1bW4tcmVzaXplLWhhbmRsZS1jb2xvcjogcmdiKDEyNiwgNDYsIDEzMik7XHJcblxyXG4gIC0tYWctZm9udC1zaXplOiAxN3B4O1xyXG4gIC0tYWctZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcclxufVxyXG4vKiBzdHlsZXMuY3NzICovXHJcbi5jdXN0b20tYnV0dG9uIHtcclxuYmFja2dyb3VuZC1jb2xvcjogIzAwN2JmZjsgLyogQ3VzdG9taXplIGJ1dHRvbiBiYWNrZ3JvdW5kIGNvbG9yICovXHJcbmNvbG9yOiAjZmZmOyAvKiBDdXN0b21pemUgdGV4dCBjb2xvciAqL1xyXG5ib3JkZXI6IG5vbmU7IC8qIFJlbW92ZSBkZWZhdWx0IGJ1dHRvbiBib3JkZXIgKi9cclxucGFkZGluZzogMTBweCAyMHB4OyAvKiBBZGQgcGFkZGluZyBmb3IgYmV0dGVyIHZpc3VhbCBhcHBlYXJhbmNlICovXHJcbmJvcmRlci1yYWRpdXM6IDVweDsgLyogQWRkIHJvdW5kZWQgY29ybmVycyAqL1xyXG5jdXJzb3I6IHBvaW50ZXI7IC8qIENoYW5nZSBjdXJzb3Igb24gaG92ZXIgKi9cclxufVxyXG5cclxuXHJcbi8qIEluY3JlYXNlIHNwZWNpZmljaXR5ICovXHJcbi5hZy1oZWFkZXIgLmN1c3RvbS1oZWFkZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjk5MDAgIWltcG9ydGFudDtcclxufSAgXHJcbi5tYXQtc2VsZWN0e1xyXG4gIHdpZHRoOiA4MCUgICFpbXBvcnRhbnQ7XHJcbn1cclxuLm1hdC1mb3JtLWZpZWxkIHtcclxuICB3aWR0aDogNTAlO1xyXG4gIGRpc3BsYXk6IGJsb2NrICFpbXBvcnRhbnQ7XHJcbn1cclxuIl19 */"] });
const ELEMENT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];


/***/ }),

/***/ 18488:
/*!************************************************************!*\
  !*** ./src/app/components/manage/manage-routing.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ManageRoutingModule": () => (/* binding */ ManageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 52816);
/* harmony import */ var _addnewcustom_addnewcustom_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addnewcustom/addnewcustom.component */ 34026);
/* harmony import */ var _customfields_customfields_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customfields/customfields.component */ 19229);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);





const routes = [
    { path: "ViewCustomFields", component: _customfields_customfields_component__WEBPACK_IMPORTED_MODULE_1__.CustomfieldsComponent },
    { path: "AddEditCustomFields", component: _addnewcustom_addnewcustom_component__WEBPACK_IMPORTED_MODULE_0__.AddnewcustomComponent }
];
class ManageRoutingModule {
}
ManageRoutingModule.ɵfac = function ManageRoutingModule_Factory(t) { return new (t || ManageRoutingModule)(); };
ManageRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: ManageRoutingModule });
ManageRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ManageRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 1312:
/*!****************************************************!*\
  !*** ./src/app/components/manage/manage.module.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ManageModule": () => (/* binding */ ManageModule)
/* harmony export */ });
/* harmony import */ var _manage_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./manage-routing.module */ 18488);
/* harmony import */ var _customfields_customfields_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customfields/customfields.component */ 19229);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/table */ 97217);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/paginator */ 9861);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 90587);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 36362);
/* harmony import */ var _addnewcustom_addnewcustom_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addnewcustom/addnewcustom.component */ 34026);
/* harmony import */ var src_app_theme_shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/theme/shared/shared.module */ 95702);
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ag-grid-angular */ 79771);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/card */ 11961);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/select */ 91434);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);












class ManageModule {
}
ManageModule.ɵfac = function ManageModule_Factory(t) { return new (t || ManageModule)(); };
ManageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: ManageModule });
ManageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[_manage_routing_module__WEBPACK_IMPORTED_MODULE_0__.ManageRoutingModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatTableModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_6__.MatSelectModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__.MatCardModule, ag_grid_angular__WEBPACK_IMPORTED_MODULE_8__.AgGridModule, _angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule, src_app_theme_shared_shared_module__WEBPACK_IMPORTED_MODULE_3__.SharedModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__.MatPaginatorModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](ManageModule, { declarations: [_customfields_customfields_component__WEBPACK_IMPORTED_MODULE_1__.CustomfieldsComponent,
        _addnewcustom_addnewcustom_component__WEBPACK_IMPORTED_MODULE_2__.AddnewcustomComponent], imports: [_manage_routing_module__WEBPACK_IMPORTED_MODULE_0__.ManageRoutingModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatTableModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_6__.MatSelectModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__.MatCardModule, ag_grid_angular__WEBPACK_IMPORTED_MODULE_8__.AgGridModule, _angular_common__WEBPACK_IMPORTED_MODULE_9__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormsModule, src_app_theme_shared_shared_module__WEBPACK_IMPORTED_MODULE_3__.SharedModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_11__.MatPaginatorModule] }); })();


/***/ }),

/***/ 83471:
/*!************************************!*\
  !*** ./src/app/error/app-error.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppError": () => (/* binding */ AppError)
/* harmony export */ });
class AppError {
    constructor(originalError) {
        this.originalError = originalError;
    }
}


/***/ }),

/***/ 87663:
/*!******************************************!*\
  !*** ./src/app/error/bad-input-error.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BadInputError": () => (/* binding */ BadInputError)
/* harmony export */ });
/* harmony import */ var _app_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-error */ 83471);

class BadInputError extends _app_error__WEBPACK_IMPORTED_MODULE_0__.AppError {
}


/***/ }),

/***/ 69731:
/*!******************************************!*\
  !*** ./src/app/error/not-found-error.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotFoundError": () => (/* binding */ NotFoundError)
/* harmony export */ });
/* harmony import */ var _app_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-error */ 83471);

class NotFoundError extends _app_error__WEBPACK_IMPORTED_MODULE_0__.AppError {
}


/***/ }),

/***/ 53707:
/*!****************************************!*\
  !*** ./src/app/models/ICustommodel.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ICustommodel": () => (/* binding */ ICustommodel),
/* harmony export */   "CustomDrpChkValuesDomainModel": () => (/* binding */ CustomDrpChkValuesDomainModel)
/* harmony export */ });
class ICustommodel {
    constructor() {
        this.IsShowInJoinNow = false;
        this.drpFieldId = 0;
        this.Fieldcount = 0;
    }
}
class CustomDrpChkValuesDomainModel {
}


/***/ })

}]);
//# sourceMappingURL=src_app_components_manage_manage_module_ts.js.map