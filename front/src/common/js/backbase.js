import moment from 'moment';

const install = function (Vue, options) {


    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    Date.prototype.format = function (fmt) {
        let o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    Vue.prototype.gSexFormat = (sex) => {
        if (sex === 'MALE') {
            return "男";
        } else if (sex === 'FEMALE') {
            return "女";
        } else {
            return "";
        }
    };

    Vue.prototype.gRowSexFormat = (row, column) => {
        let sex = row[column.property];
        if (sex === 1) {
            return "男";
        } else if (sex === 0) {
            return "女";
        } else {
            return "未知";
        }
    };

    //备注格式处理
    Vue.prototype.gRemarkFormat = (row, column) => {
        let content = row[column.property];
        return content.replace(/\n/g, '<br/>');
    };

    //大坑  之前命名过timeFormat，和elementUI中的方法重名，导致datetime的时间组价你无法使用
    Vue.prototype.gTimeFormat = (date) => {
        if ((!date && typeof (date) != "undefined" && date != 0) || date == '') {
            return '';
        } else {
            return moment(date).format("YYYY-MM-DD HH:mm:ss");
        }
    };

    Vue.prototype.gDateFormat = (date) => {
        if ((!date && typeof (date) != "undefined" && date != 0) || date == '') {
            return '';
        } else {
            return moment(date).format("YYYY-MM-DD");
        }
    };

    Vue.prototype.gHourFormat = (date) => {
        if ((!date && typeof (date) != "undefined" && date != 0) || date == '') {
            return '';
        } else {
            return moment(date).format("HH:mm:ss");
        }
    };

    Vue.prototype.gRowDateFormat = (row, column) => {
        let date = row[column.property];
        if (!date && typeof (date) != "undefined" && date != 0) {
            return "";
        } else {
            return moment(date).format("YYYY-MM-DD");
        }
    };

    Vue.prototype.gRoleFormat = (roleArr) => {
        if (roleArr) {
            return roleArr.map(role => {
                return role.roleName
            }).join(',');
        } else {
            return ''
        }
    };

    Vue.prototype.gRowItemRate = (row, column) => {
        let itemRate = row[column.property];
        return itemRate + "%";
    };

    Vue.prototype.gRowItemNoPoint = (row, column) => {
        let itemNum = row[column.property];
        return itemNum.substring(0, itemNum.indexOf('.'));
    };

    Vue.prototype.validateRules = (formName, _this) => {
        let result = '';
        _this.$refs[formName].validate((valid) => {
            if (valid) {
                result = true;
            } else {
                _this.$message({
                    message: '输入有误',
                    type: 'error'
                });
                result = false;
            }
        });
        return result;
    };

};

export default install;
