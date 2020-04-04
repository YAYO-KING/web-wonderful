/**
 * Created by yanyue on 2019-09-25 20:48
 */

import GDialog from './dialog/Dialog';
import GECharts from './echarts/ECharts';
import GSplit from './split/Split';
import GUploadFiile from './uploadfile/UploadFile'
import GTable from './table/Table'
import GPagination from './pagination/Pagination'
import GAreaSelect from './areaslect/AreaSelect'
export default {
    install(Vue, options) {
        Vue.component('g-dialog', GDialog);
        Vue.component('g-split', GSplit);
        Vue.component('g-upload-file',GUploadFiile);
        Vue.component('g-echarts',GECharts);
        Vue.component('g-table',GTable);
        Vue.component('g-pagination',GPagination);
        Vue.component('g-areaSelect',GAreaSelect);
    }
};