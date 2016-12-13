
var vm = new Vue({
	el: '.container',
	data: {
		msg: '',
		msg_success: false,
		msg_failed: false,
		msg_error: ''
	},
	computed: {
		getMessage: function() {
			return {
				msg: this.msg,
				time: moment().format()
			}
		}
	},
	methods: {
		send_msg: function(dest) {
			this.msg_success = false;
			this.msg_failed = false;
			this.msg_error = '';

			this.resource.save({dest: dest}, this.getMessage).then(function(res) {
				console.log(res.body);
				if (res.body.saved == true) {
					this.msg_success = true;
				} else {
					this.msg_failed = true;
					this.msg_error = res.body.err;
				}
			});
		}
	},
	created: function() {
		this.resource = this.$resource('/api{/dest}');
	}
});

$("textarea").keypress(function(e){
	if (e.which == '13')
	{
		return false;
	}
});
