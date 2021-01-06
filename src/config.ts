
import {register, registerHtmlTag} from "./base/RxDrag";
import { Button, Divider, Typography } from '@material-ui/core';
import PortletGridItem from 'components/Portlet/GridItem';
import ListView from 'components/ListView';
import MediaSelect from 'components/inputs/MediaSelect/MediaSelect';
import OneToManyTable from 'components/OneToMany/Table';
import Portlet from 'components/Portlet';
import PortletFooter from 'components/Portlet/Footer';
import FormGridContainer from 'components/Portlet/GridContainer';
import Combobox from 'components/inputs/Select/Combobox';
import SelectBox from 'components/inputs/Select/SelectBox';
import Canvas from 'components/Canvas';
import MediasPortlet from 'components/MediasPortlet';
import { HeadRule } from 'components/Head/Rule';
import { ButtonRule } from 'components/Button/Rule';
import { DividerRule } from 'components/Divider/Rule';
import { CanvasRule } from 'components/Canvas/Rule';
import GridRow from 'components/Grid/Row';
import GridColumn from 'components/Grid/Column';
import { TypographyRule } from 'components/Typography/Rule';
import { PortletGridItemRule } from 'components/Portlet/GridItem/Rule';
import TextBox from 'components/inputs/TextBox';
import { TextBoxRule } from 'components/inputs/TextBox/Rule';
import { MediasPortletRule } from 'components/MediasPortlet/Rule';
import { SelectRule } from 'components/inputs/Select/Rule';
import { OneToManyTableRule } from 'components/OneToMany/Table/Rule';
import { PortletRule } from 'components/Portlet/Rule';
import { ListViewRule } from 'components/ListView/Rule';
import { GridColumnRule } from 'components/Grid/Column/Rule';
import { GridRowRule } from 'components/Grid/Row/Rule';
import OneToManyPortlet from 'components/OneToMany/Portlet';
import { OneToManyPortletRule } from 'components/OneToMany/Portlet/Rule';
import MultiSelectBox from 'components/inputs/Select/MultiSelectBox';
import SwitchBox from 'components/inputs/SwitchBox';
import { SwitchBoxRule } from 'components/inputs/SwitchBox/Rule';
import FieldView from 'components/FieldView';
import { FieldViewRule } from 'components/FieldView/Rule';
import TinyMCE from 'components/inputs/TinyMCE';
import {TinyMCERule} from 'components/inputs/TinyMCE/Rule';
import TreeEditor from 'components/TreeEditor';
import { TreeEditorRule } from 'components/TreeEditor/Rule';
import TreeSelect from 'components/inputs/TreeSelect';
import { TreeSelectRule } from 'components/inputs/TreeSelect/Rule';
import Medias from 'components/Medias';
import AntDesignChart from 'components/AntDesignChart';
import Checkbox from 'components/Checkbox';
import { CheckboxRule } from 'components/Checkbox/Rule';
import CheckboxGroup from 'components/CheckboxGroup';
import { CheckboxGroupRule } from 'components/CheckboxGroup/Rule';
import RadioGroup from 'components/RadioGroup';
import { RadioGroupRule } from 'components/RadioGroup/Rule';
import { AntDesignChartRule } from 'components/AntDesignChart/Rule';
import { MediaSelectRule } from "components/inputs/MediaSelect/Rule";
import TableColumn from "components/OneToMany/Table/TableColumn";
import { TableColumnRule } from "components/OneToMany/Table/TableColumn/Rule";

register('Canvas', Canvas, CanvasRule);
register('Divider', Divider, DividerRule);
register('GridRow', GridRow, GridRowRule);
register('GridColumn', GridColumn, GridColumnRule);
register('Button',Button, ButtonRule);
register('TextBox', TextBox, TextBoxRule);
register('SwitchBox', SwitchBox, SwitchBoxRule);
register('Checkbox', Checkbox, CheckboxRule);
register('CheckboxGroup', CheckboxGroup, CheckboxGroupRule);
register('RadioGroup', RadioGroup, RadioGroupRule);
register('FieldView', FieldView, FieldViewRule);
register('Portlet', Portlet, PortletRule);
register('FormGridContainer', FormGridContainer);
register('PortletGridItem', PortletGridItem, PortletGridItemRule);
register('PortletFooter', PortletFooter);
register('Typography', Typography, TypographyRule);
register('ListView', ListView, ListViewRule);
register('MediasPortlet', MediasPortlet, MediasPortletRule);
register('SelectBox', SelectBox, SelectRule);
register('Combobox', Combobox, SelectRule);
register('MultiSelectBox', MultiSelectBox, SelectRule );
register ('TableColumn', TableColumn, TableColumnRule);
register('OneToManyTable', OneToManyTable, OneToManyTableRule);
register('OneToManyPortlet', OneToManyPortlet, OneToManyPortletRule);
register('TinyMCE', TinyMCE, TinyMCERule);
register('TreeEditor', TreeEditor, TreeEditorRule);
register('TreeSelect', TreeSelect, TreeSelectRule);
register('MediaSelect', MediaSelect, MediaSelectRule);
register('Medias', Medias);
register('AntDesignChart', AntDesignChart, AntDesignChartRule);

registerHtmlTag('h1', HeadRule);
registerHtmlTag('h2', HeadRule);
registerHtmlTag('h3', HeadRule);
registerHtmlTag('h4', HeadRule);
registerHtmlTag('h5', HeadRule);
registerHtmlTag('h6', HeadRule);