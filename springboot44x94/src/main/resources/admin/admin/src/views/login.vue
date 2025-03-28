<template>
  <div>
    <div class="container" :style='{"minHeight":"100vh","alignItems":"center","background":"url(http://codegen.caihongy.cn/20221011/1a24c174ab214d489dd490fe814ab39a.jpg)","display":"flex","width":"100%","backgroundPosition":"center","justifyContent":"center"}'>

      <el-form :style='{"padding":"40px 20px 20px","margin":"0","borderRadius":"0","background":"url(http://codegen.caihongy.cn/20221012/582900690e23471d9f11b3e6fca90a12.png)","width":"900px","backgroundSize":"100% 100%","height":"900px"}'>
        <div v-if="true" :style='{"margin":"150px 0 0 0","color":"#b97a8f","textAlign":"center","width":"100%","lineHeight":"40px","fontSize":"28px","textShadow":"4px 4px 2px rgba(219, 123, 151, .8)"}' class="title-container">儿童性教育网站登录</div>
        <div v-if="loginType==1" class="list-item" :style='{"width":"50%","margin":"40px 0 0 220px","alignItems":"center","flexWrap":"wrap","display":"flex"}'>
          <div v-if="false" class="lable" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>用户名</div>
          <input :style='{"border":"1px solid #d87b96","padding":"0 10px","boxShadow":"0 0 6px rgba(192, 112, 146, .3)","outline":"1px dashed #d87b96","color":"#666","outlineOffset":"4px","width":"100%","fontSize":"15px","height":"44px"}' placeholder="请输入用户名" name="username" type="text" v-model="rulesForm.username">
        </div>
        <div v-if="loginType==1" class="list-item" :style='{"width":"50%","margin":"40px 0 0 220px","alignItems":"center","flexWrap":"wrap","display":"flex"}'>
          <div v-if="false" class="lable" :style='{"width":"64px","lineHeight":"44px","fontSize":"14px","color":"rgba(64, 158, 255, 1)"}'>密码：</div>
          <input :style='{"border":"1px solid #d87b96","padding":"0 10px","boxShadow":"0 0 6px rgba(192, 112, 146, .3)","outline":"1px dashed #d87b96","color":"#666","outlineOffset":"4px","width":"100%","fontSize":"15px","height":"44px"}' placeholder="请输入密码" name="password" type="password" v-model="rulesForm.password">
        </div>
        <div :style='{"width":"50%","margin":"20px auto","justifyContent":"center","display":"flex"}' v-if="roles.length>1" prop="loginInRole" class="list-type">
          <el-radio v-for="item in roles" v-bind:key="item.roleName" v-model="rulesForm.role" :label="item.roleName">{{item.roleName}}</el-radio>
        </div>
        <div :style='{"width":"70%","margin":"20px auto","position":"relative","flexWrap":"wrap","display":"flex"}'>
          <el-button v-if="loginType==1" :style='{"border":"0","cursor":"pointer","padding":"0 24px","margin":"10px 30%","outline":"none","color":"#fff","borderRadius":"50px","background":"#b6788d","width":"50%","fontSize":"14px","height":"40px"}' type="primary" @click="login()" class="loginInBt">登录</el-button>
        </div>
      </el-form>

    </div>
  </div>
</template>
<script>

import menu from "@/utils/menu";
export default {
  data() {
    return {
      baseUrl:this.$base.url,
      loginType: 1,
      rulesForm: {
        username: "",
        password: "",
        role: "",
        code: '',
      },
      menus: [],
      roles: [],
      tableName: "",
      codes: [{
        num: 1,
        color: '#000',
        rotate: '10deg',
        size: '16px'
      },{
        num: 2,
        color: '#000',
        rotate: '10deg',
        size: '16px'
      },{
        num: 3,
        color: '#000',
        rotate: '10deg',
        size: '16px'
      },{
        num: 4,
        color: '#000',
        rotate: '10deg',
        size: '16px'
      }],
    };
  },
  mounted() {
    let menus = menu.list();
    this.menus = menus;

    for (let i = 0; i < this.menus.length; i++) {
      if (this.menus[i].hasBackLogin=='是') {
        this.roles.push(this.menus[i])
      }
    }

  },
  created() {
    this.getRandCode()
  },
  destroyed() {
	    },
  methods: {

    //注册
    register(tableName){
		this.$storage.set("loginTable", tableName);
        this.$storage.set("pageFlag", "register");
		this.$router.push({path:'/register'})
    },
    // 登陆
    login() {

		if (!this.rulesForm.username) {
			this.$message.error("请输入用户名");
			return;
		}
		if (!this.rulesForm.password) {
			this.$message.error("请输入密码");
			return;
		}
		if(this.roles.length>1) {
			if (!this.rulesForm.role) {
				this.$message.error("请选择角色");
				return;
			}

			let menus = this.menus;
			for (let i = 0; i < menus.length; i++) {
				if (menus[i].roleName == this.rulesForm.role) {
					this.tableName = menus[i].tableName;
				}
			}
		} else {
			this.tableName = this.roles[0].tableName;
			this.rulesForm.role = this.roles[0].roleName;
		}

		this.$http({
			url: `${this.tableName}/login?username=${this.rulesForm.username}&password=${this.rulesForm.password}`,
			method: "post"
		}).then(({ data }) => {
			if (data && data.code === 0) {
				this.$storage.set("Token", data.token);
				this.$storage.set("role", this.rulesForm.role);
				this.$storage.set("sessionTable", this.tableName);
				this.$storage.set("adminName", this.rulesForm.username);
				this.$router.replace({ path: "/index/" });
			} else {
				this.$message.error(data.msg);
			}
		});
    },
    getRandCode(len = 4){
		this.randomString(len)
    },
    randomString(len = 4) {
      let chars = [
          "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k",
          "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v",
          "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G",
          "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
          "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2",
          "3", "4", "5", "6", "7", "8", "9"
      ]
      let colors = ["0", "1", "2","3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
      let sizes = ['14', '15', '16', '17', '18']

      let output = [];
      for (let i = 0; i < len; i++) {
        // 随机验证码
        let key = Math.floor(Math.random()*chars.length)
        this.codes[i].num = chars[key]
        // 随机验证码颜色
        let code = '#'
        for (let j = 0; j < 6; j++) {
          let key = Math.floor(Math.random()*colors.length)
          code += colors[key]
        }
        this.codes[i].color = code
        // 随机验证码方向
        let rotate = Math.floor(Math.random()*60)
        let plus = Math.floor(Math.random()*2)
        if(plus == 1) rotate = '-'+rotate
        this.codes[i].rotate = 'rotate('+rotate+'deg)'
        // 随机验证码字体大小
        let size = Math.floor(Math.random()*sizes.length)
        this.codes[i].size = sizes[size]+'px'
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  position: relative;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
      background: url(http://codegen.caihongy.cn/20221011/1a24c174ab214d489dd490fe814ab39a.jpg);
        
  .list-item /deep/ .el-input .el-input__inner {
		border: 1px solid #d87b96;
		padding: 0 10px;
		box-shadow: 0 0 6px rgba(192, 112, 146, .3);
		outline: 1px dashed #d87b96;
		color: #666;
		width: 100%;
		font-size: 15px;
		outline-offset: 4px;
		height: 44px;
	  }
  
  .list-code /deep/ .el-input .el-input__inner {
  	  	border: 1px solid #d87b96;
  	  	padding: 0 10px;
  	  	box-shadow: 0 0 6px rgba(192, 112, 146, .3);
  	  	outline: 1px dashed #d87b96;
  	  	color: #666;
  	  	outline-width: 1px;
  	  	width: calc(100% - 80px);
  	  	font-size: 15px;
  	  	outline-offset: 4px;
  	  	outline-style: dashed;
  	  	outline-color: #d87b96;
  	  	height: 44px;
  	  }

  .list-type /deep/ .el-radio__input .el-radio__inner {
		background: rgba(53, 53, 53, 0);
		border-color: #999;
	  }
  .list-type /deep/ .el-radio__input.is-checked .el-radio__inner {
        background: #d87b96;
        border-color: #d87b96;
      }
  .list-type /deep/ .el-radio__label {
		color: #999;
		font-size: 14px;
	  }
  .list-type /deep/ .el-radio__input.is-checked+.el-radio__label {
        color: #d87b96;
        font-size: 14px;
      }
}
</style>
