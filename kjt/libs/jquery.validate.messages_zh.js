/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
 */
(function ($) {
	$.extend($.validator.messages, {
		required: "输入值不能为空",
		remote: "请修正该字段",
		email: "请输入正确格式的电子邮件",
		url: "请输入合法的网址",
		date: "请输入合法的日期",
		dateISO: "请输入合法的日期 (ISO).",
		number: "请输入合法的数字",
		digits: "只能输入整数",
		creditcard: "请输入合法的信用卡号",
		equalTo: "前后密码不一致",
		accept: "请输入拥有合法后缀名",
		maxlength: $.validator.format("长度最多是 {0} 位"),
		minlength: $.validator.format("长度最少是 {0} 位"),
		rangelength: $.validator.format("长度介于 {0} 和 {1} 位"),
		range: $.validator.format("介于 {0} 和 {1} 之间的值"),
		max: $.validator.format("最大为 {0} 的值"),
		min: $.validator.format("最小为 {0} 的值")
	});
}(jQuery));