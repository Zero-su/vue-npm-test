<template>
    <div :class="['datepicker',color]">
        <div :class="['datebox',dateSelected?'date-select':'date-box']" @click="panelShow = !panelShow;dateSelected=!dateSelected;isDayScrollYear = false;isDayScrollMonth = false;">
            <span class="title">{{title}}</span>
            <em class="icon icon_date"></em>
        </div>
        <div class="date" v-if="panelShow">
            <div class="isDay_select" v-if="datetype == 'day' || datetype == 'second'">
                <div class="selectDate">
                    <p @click="isDayScrollYear = !isDayScrollYear" :class="[isDayScrollYear?'yearShow':'']">
                        <em>{{isDay_year}}</em>
                        <i class="icon icon_drop"></i>
                        <scrollbar width="100%" height ="160" :offy="offy" class="scrollbar" v-if="isDayScrollYear">
                            <ul slot="content" class="content">
                                <li v-for="index in isDaytoYear"  @click.stop="isDaygetYear(index*1 + isDay_year*1 - 50)">{{index*1 + isDay_year*1 - 50}}</li>
                            </ul>
                        </scrollbar>
                    </p>
                    <p @click="isDayScrollMonth = !isDayScrollMonth" :class="[isDayScrollMonth?'monthShow':'']">
                        <em>{{isDay_month < 10 ? '0' + isDay_month*1 : isDay_month}}</em>
                        <i class="icon icon_drop"></i>
                        <scrollbar width="100%" height ="160" offy="0" class="scrollbar"  v-if="isDayScrollMonth">
                            <ul slot="content" class="content">
                                <li v-for="index in 12"  @click.stop="isDaygetMonth(index)">{{index*1 <10?'0'+index : index}}</li>
                            </ul>
                        </scrollbar>
                    </p>
                </div>
                <div class="datelist">
                    <p class="week">
                        <span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span><span>日</span>
                    </p>
                    <div class="box">
                        <p v-for="(item,index) in day_lists">
                            <span v-for = "(ite,ind) in item" :class="['tag'+ite.tag,ite.value == nowday&&isDay_month == nowmonth&&isDay_year == nowyear&&ite.tag == 0?'tag4':'',ite.value == thisday&&isDay_month == thismonth&&isDay_year == thisyear&&ite.tag == 0?'tag3':'']" @click="isGetDay(ite)">{{ite.value}}</span>
                        </p>
                    </div>
                </div>
                <div class="second" v-if="datetype == 'second'">
                    <i class="img"></i>
                    <div class="box-second">
                        <em></em>
                        <input type="text" v-model="hours" @input="hours = filter(hours)">
                        <span class="box-1">
                            <i class="icon icon_user1" @click="ishours(1)"></i>
                            <i class="icon icon_drop"  @click="ishours(2)"></i>
                        </span>
                        <em>:</em>
                        <input type="text" v-model="minutes" @input="minutes = filter(minutes)">
                        <span class="box-1">
                            <i class="icon icon_user1" @click="isminutes(1)"></i>
                            <i class="icon icon_drop"  @click="isminutes(2)"></i>
                        </span>
                        <em>:</em>
                        <input type="text" v-model="seconds" @input="seconds = filter(seconds)">
                        <span class="box-1">
                            <i class="icon icon_user1" @click="isseconds(1)"></i>
                            <i class="icon icon_drop" @click="isseconds(2)"></i>
                        </span>
                    </div>
                </div>
                <div class="isempty" v-if="isEmpty || datetype == 'second'">
                    <i class="empty" @click="empty">清空</i>
                    <i class="sure" @click="emit">确定</i> 
                </div>
            </div>
            

            <div  v-if="datetype == 'month'" class="isDay_select" >
                <div class="selectDate selectMonth">
                    <p @click="isDayScrollYear = !isDayScrollYear" :class="[isDayScrollYear?'yearShow':'']">
                        <em>{{isDay_year}}</em>
                        <i class="icon icon_drop"></i>
                        <scrollbar width="100%" height ="160" :offy="offy" class="scrollbar" v-if="isDayScrollYear">
                            <ul slot="content" class="content">
                                <li v-for="index in isDaytoYear"  @click.stop="isDaygetYear(index*1 + isDay_year*1 - 50)">{{index*1 + isDay_year*1 - 50}}</li>
                            </ul>
                        </scrollbar>
                    </p>
                </div>
                <div class="monthlist">
                    <span v-for="(item,index) in 12">
                        <i :class="[index+1 == thismonth&&isDay_year==thisyear?'tag3':'',isDay_year == nowyear&&index+1 == nowmonth?'tag4':'']" @click="isGetMonth(item)">{{index + 1}}</i>
                    </span>
                   
                </div>
                <div class="isempty-month" v-if="isEmpty">
                    <i class="empty" @click="empty">清空</i>
                    <i class="sure" @click="emit">确定</i> 
                </div>
            </div>

            <div class="isDay_select" v-if="datetype=='year'">
                <div class="selectDate selectYear">
                    <i class="icon icon_left" @click="yeartodown"></i>
                    <span>{{isDay_year - 5}}-{{isDay_year*1+6}}</span>
                    <i class="icon icon_right" @click="yeartoup"></i>
                </div>
                <div class="box">
                    <span v-for="(item,index) in 12" @click="isGetYear(isDay_year*1 - 6 + item)">
                        <i :class="[(isDay_year*1 - 6 + item) == thisyear?'tag3':'',(isDay_year*1 - 6 + item) == nowyear?'tag4':'']">{{isDay_year*1 - 6 + item}}</i>
                    </span>
                </div>
                <div class="isempty-month" v-if="isEmpty">
                    <i class="empty" @click="empty">清空</i>
                    <i class="sure" @click="emit">确定</i> 
                </div>
            </div>

            
        </div>
    </div>
</template>
<script>
import scrollbar from '../scrollBar/scrollBar.vue'
export default {
    name: 'datepicker',
    props: {
        datetype: {
            default: 'day'
        },
        placeholder: {
            default: '请选择'
        },
        value: {

        },
        color:{
            default: 'blue'
        },
        isEmpty: {
            default : false
        }
    },
    components: {
        scrollbar
    },
    data () {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        return {
            title: '',
            panelShow: false,

            //日期选择
            nowyear: year,
            nowmonth: month,
            nowday: day,
            thisyear: year, //初始的年月日 用于对比
            thismonth: month, //初始的年月日 用于对比
            thisday: day, //初始的年月日 用于对比
            isDay_year:year, //用于选择的年月日
            isDay_month:month, //用于选择的年月日
            isDay_day: day, //用于选择的年月日
            hours: '00',
            minutes: '00',
            seconds: '00',
            offy:920,
            isDaytoYear:100,
            isDayScrollYear: false,
            isDayScrollMonth: false,
            dateSelected: false,
            day_lists:[],
            isemptySelectValue: '',
            //月份选择
            isMonth_year:'',


            //年份选择
        }
    },
    created () {
        this.dateInit();

    },
    watch: {
        day_lists(){

        },
        value(){
            this.dateInit();

        }
    },
    mounted () {
        var that =this;
        window.addEventListener('click', function(e){
            if(!that.$el.contains(e.target)){
                    that.dateSelected = false;
                    that.panelShow = false;
                    that.isDayScrollYear = false;
                    that.isDayScrollMonth = false;
                }
        })
    },
    methods: {
        dateInit(){
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var day = now.getDate();

            //如果value存在 为value，否则为placeholder
            if(this.value){
                this.title = this.value
            } else{
                this.title = this.placeholder
            }

            //判断年月日
            if(this.datetype == 'day'){
                if(this.value){
                    var index = this.value.indexOf('-');
                    var lastindex = this.value.lastIndexOf('-');
                    this.isDay_year = this.value.slice(0,index);
                    this.isDay_month = this.value.slice(index + 1,lastindex);
                    this.isDay_day = this.value.slice(lastindex+1);
                } 
                this.thisyear = this.isDay_year;
                this.thismonth = this.isDay_month;
                this.thisday = this.isDay_day;
                this.isDaygetYearList(this.isDay_year,this.isDay_month,this.isDay_day);
            } else if(this.datetype == 'month'){
                if(this.value){
                    var index = this.value.indexOf('-');
                    this.isDay_year = this.value.slice(0,index);
                    this.isDay_month = this.value.slice(index + 1);

                } 
                this.thisyear = this.isDay_year;
                this.thismonth = this.isDay_month;
            } else if(this.datetype == 'year'){
                if(this.value){
                    this.thisyear = this.value;
                    this.isDay_year = this.value;
                }
            } else if(this.datetype == 'second'){
                if(this.value){
                    var index = this.value.indexOf('-');
                    var index1 = this.value.indexOf(' ');
                    var lastindex = this.value.lastIndexOf('-');
                    this.isDay_year = this.value.slice(0,index);
                    this.isDay_month = this.value.slice(index + 1,lastindex);
                    this.isDay_day = this.value.slice(lastindex+1,index1);
                    this.hours = this.value.slice(index1+1,index1+3);
                    this.minutes = this.value.slice(index1+4,index1+6);
                    this.seconds = this.value.slice(index1+7);
                } 
                this.thisyear = this.isDay_year;
                this.thismonth = this.isDay_month;
                this.thisday = this.isDay_day;
                this.isDaygetYearList(this.isDay_year,this.isDay_month,this.isDay_day);
            }
        },
        isDaygetYearList(year,month,day){
            var now = new Date();
            var thisyear = now.getFullYear();
            var thismonth = now.getMonth() + 1;
            var thisday = now.getDate();
			let firstDay = new Date(year,month-1,1);//获取当月第一天
			let lastDay = new Date(year,month-1,0).getDate(); //获取上月的最后一天
			let firstWeek = firstDay.getDay();//当月的第一天是星期几
			// let index = this.value.split('').lastIndexOf('-');
			let dayList = [];
			let arr=[];
			let days_per_month = [31,this.isLeap(year),31,30,31,30,31,31,30,31,30,31];
			// this.month_day = days_per_month[m-1]
			if (firstWeek ==1 ) {
				firstWeek = 8;
			} else if (firstWeek ==0) {
				firstWeek = 7;
			} 
			for(let k = firstWeek-1;k>0;k--){
					dayList.push(lastDay-k+1)
				} 
			for(let j =0;j<days_per_month[month-1];j++){
				dayList.push(j+1);
			}       
			for(let i =1;i<dayList.length;i++){
				if (dayList.length<42) {
					dayList.push(i)
				}
			}
			for(let q = 0 ; q <dayList.length;q++){
                arr[q]={};
                arr[q].value = dayList[q];
                if(q<=7&&dayList[q]>20){
                    arr[q].tag=1;
                }else if(q>=28&&dayList[q]<14){
                    arr[q].tag=2;
                }else if(dayList[q]==this.thisday&& month == this.thismonth&&year==this.thisyear){
             
                    arr[q].tag=3              
                } else if (dayList[q] == thisday&&month == thismonth&&year ==thisyear) {
                    arr[q].tag = 4
                } else {
                    arr[q].tag = 0
                }
			}
			this.day_lists = (()=>{
							let res=[];
							for(let x=0;x<6;x++){
								res.push(arr.slice(x*7,x*7+7))
							}
							return res
						})()
        },

        isLeap(year){ //判断闰年
			return year % 4 == 0 ? (year % 100 != 0 ? 29 : (year % 400 == 0 ? 29 : 28)) : 28;
		},
        isDaygetYear(value){
            this.isDayScrollYear = false;
            this.isDay_year = value;
            this.isDaygetYearList(this.isDay_year,this.isDay_month ,this.isDay_day)
        },

        isDaygetMonth(value){
            this.isDayScrollMonth = false;
            this.isDay_month = value<10?'0'+value:value;
            this.isDaygetYearList(this.isDay_year,this.isDay_month ,this.isDay_day)
        },
        isGetDay(item){
            var tag = item.tag;
            if(tag == 1){
                this.isDay_month<=1?(this.isDay_month=12,this.isDay_year--):this.isDay_month--;
                this.isDaygetYearList(this.isDay_year,this.isDay_month ,this.isDay_day);
            } else if(tag == 2){
                this.isDay_month>=12?(this.isDay_month=1,this.isDay_year++):this.isDay_month++;
                this.isDaygetYearList(this.isDay_year,this.isDay_month ,this.isDay_day);
            } else{
                if(!this.isEmpty){
                    this.panelShow = false;
                    var month = this.isDay_month <10?'0'+this.isDay_month*1:this.isDay_month;
                    var day = item.value < 10?'0'+item.value:item.value;
                    this.title = this.isDay_year+'-'+month + '-'+day;
                    this.thisday = item.value;
                    this.thismonth = this.isDay_month;
                    this.thisyear = this.isDay_year;
                    this.dateSelected = false;
                    this.$emit('input',this.title);
                    this.isDaygetYearList(this.isDay_year,this.isDay_month ,item.value)
                } else{
                    this.thisday = item.value;
                    this.thismonth = this.isDay_month;
                    this.thisyear = this.isDay_year;
                    this.isemptySelectValue = item.value;
                    this.isDaygetYearList(this.isDay_year,this.isDay_month ,item.value)
                }
                
            }
        },
        isGetMonth(item){
            if(!this.isEmpty){
                this.panelShow = false;
                var month = item <10?'0'+item:item;
                this.title = this.isDay_year + '-' + month;
                this.thismonth = item;
                this.thisyear = this.isDay_year;
                this.dateSelected = false;
                this.$emit('input',this.title);
            } else{
                var month = item <10?'0'+item:item;
                this.isemptySelectValue = item;
                this.thismonth = item;
                this.thisyear = this.isDay_year;
            }
            
        },
        isGetYear(item){
            if(!this.isEmpty){
                this.panelShow = false;
                this.thisyear = item;
                this.title = item;
                this.dateSelected = false;
                this.$emit('input',this.title);
            } else{
                this.thisyear = item;
                this.isemptySelectValue = item;
            }
            
            
        },
        yeartodown(){
            this.isDay_year = this.isDay_year*1 - 12;
        },
        yeartoup(){
            this.isDay_year = this.isDay_year*1 + 12;
        },
        empty(){
            this.panelShow = false;
            this.title = '';
            this.$emit('input',this.title);
        },
        emit(){
            this.panelShow = false;
            this.dateSelected = false;
            if(this.datetype == 'day'){

                var month = this.isDay_month <10?'0'+this.isDay_month*1:this.isDay_month;
                var day = this.isemptySelectValue < 10?'0'+this.isemptySelectValue:this.isemptySelectValue;
                this.title = this.isDay_year+'-'+month + '-'+day;
                this.isDaygetYearList(this.isDay_year,this.isDay_month ,this.isemptySelectValue)
            } else if(this.datetype == 'month'){
                var month = this.isemptySelectValue <10?'0'+this.isemptySelectValue:this.isemptySelectValue;
                this.title = this.isDay_year + '-' + month;
            } else if(this.datetype == 'year'){
                this.title = this.isemptySelectValue;
            } else if(this.datetype == 'second'){
                var month = this.isDay_month <10?'0'+this.isDay_month*1:this.isDay_month;
                var day = '';
                if(this.isemptySelectValue){
                     day = this.isemptySelectValue < 10?'0'+this.isemptySelectValue:this.isemptySelectValue;
                } else{
                    day = this.thisday
                }
                
                var hour = this.hours*1 < 10?'0'+this.hours*1:this.hours;
                var minute = this.minutes*1 < 10?'0'+this.minutes*1:this.minutes;
                var second = this.seconds*1 < 10?'0'+this.seconds*1:this.seconds;
                this.title = this.isDay_year+'-'+month + '-'+day+' '+hour + ':'+minute + ':'+second;
                this.isDaygetYearList(this.isDay_year,this.isDay_month ,this.isemptySelectValue)
            }
            this.$emit('input',this.title);
        },
        ishours(index){
            if(index == 1){
                var hour = this.hours*1 + 1;
                if(hour < 10&&hour>=0){
                    this.hours = '0'+hour;
                } else{
                    this.hours = hour
                }
            } 
             if(index == 2){
                var hour = this.hours*1 - 1;
                if(hour < 10&&hour>=0){
                    this.hours = '0'+hour
                } else if(hour < 0){
                    this.hours = '00'
                } else{
                    this.hours = hour
                }
            }
        },
        isminutes(index){
            if(index == 1){
                var minute = this.minutes*1 + 1;
                if(minute < 10&&minute>=0){
                    this.minutes = '0'+minute;
                } else{
                    this.minutes = minute
                }
            } 
             if(index == 2){
                var minute = this.minutes*1 - 1;
                if(minute < 10&&minute>=0){
                    this.minutes = '0'+minute
                } else if(minute < 0){
                    this.minutes = '00'
                } else{
                    this.minutes = minute
                }
            }
        },
        isseconds(index){
            if(index == 1){
                var second = this.seconds*1 + 1;
                if(second < 10&&second>=0){
                    this.seconds = '0'+second;
                } else{
                    this.seconds = second
                }
            } 
             if(index == 2){
                var second = this.seconds*1 - 1;
                if(second < 10&&second>=0){
                    this.seconds = '0'+second
                } else if(second < 0){
                    this.seconds = '00'
                } else{
                    this.seconds = second
                }
            }
        },
        filter(value){
            var re = /^[0-9]+$/ ;
            var flag = re.test(value);
            if(flag){
                if(value*1 < 10){
                    return '0'+value*1
                } else{
                    return value*1
                }
            }else{
                return '00'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.blue{
    .date-box{
        border-radius: 2px;
        background: linear-gradient(#f6f6f4, #e6e7e2);
        border: 1px solid #dcdcda;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        .title{
            border-right: 1px solid #dcdcda;;
            color: #474843;
            text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
        }
        .icon{
           color: #474843;
            text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
        }
        &:hover{
    
            .title{
                color: #3d7400;
                text-shadow: 0 1px 0 #fff;
            }
            .icon{
                color: #3d7400;
                text-shadow: 0 1px 0 #fff;
            }
        }
    }
    .date-select{
        background: #8cc33f;
        box-shadow: 0 1px 0px #fff, 0 1px 1px rgba(0, 0, 0, 0.36) inset;
        .title{
            border-right: 1px solid #75ac28;;
            color: #fbfbfb;
            text-shadow: 0 1px 0 rgba(0, 0, 0, 0.36);
        }
        .icon{
            color: #fbfbfb;
            text-shadow: 0 1px 0 rgba(0, 0, 0, 0.36);
        }
        
    }
    .date{
        .selectDate{
            background: linear-gradient(#98c84b, #67a505);
            box-shadow: 0 1px 1px rgba(0,0,0,0.48), 0 1px 2px rgba(255,255,255,0.3) inset;
            p{
                text-align: center;
                em{
                    color: #fbfbfb;
                    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.38);
                    line-height: 28px;
                }
                i.icon{
                    color: #fbfbfb;
                    text-shadow: 0 1px rgba(0, 0, 0, 0.3);
                    line-height: 28px;
                }
            }
            .scrollbar{
                background: #767971;
            }
            .yearShow{
                background: #767971;
                border-top-left-radius: 1px;
                border-top-right-radius: 1px;
                border-bottom: 1px solid #5b5c59;
            
                em{
                    color: #fbfbfb;
                    text-shadow: 0 1px rgba(0, 0, 0, 0.3);
                }
                i.icon{
                    color: #fbfbfb;
                    text-shadow: 0 1px rgba(0, 0, 0, 0.3);
                }
               
            }
            .monthShow{
                background: #767971;
                border-top-left-radius: 1px;
                border-top-right-radius: 1px;
                border-bottom: 1px solid #5b5c59;
            
                em{
                    color: #fbfbfb;
                    text-shadow: 0 1px rgba(0, 0, 0, 0.3);
                }
                i.icon{
                    color: #fbfbfb;
                    text-shadow: 0 1px rgba(0, 0, 0, 0.3);
                }
            }
        }
        .datelist{
            .week{
                span{
                    color: #3d7400;
                    text-shadow: 0 1px #ffffff;
                }
            }
            .box{
         
                border-top: 1px solid #cdcec8;
            }
        }
        
    }
}
.datepicker{
    width: 130px;
    height: 30px;
    position: relative;
    .datebox{
        width: 100%;
        height: 30px;
        cursor: pointer;
        .title{
            display: block;
            width: calc(100% - 30px);
            height: 30px;
            float: left;
            padding-left: 10px;
            line-height: 30px;
            padding-right: 10px;
        }
        .icon{
                line-height: 30px;
                float: right;
                display: block;
                width: 30px;
                height: 30px;
                text-align: center;
        }
    }
    .date{
        position: absolute;
        top: 32px;
        left: 0;
        width: 236px;
        background: #e7e8e3;
        border: 1px solid #cdcec8;
        box-shadow: 0 1px 0 #fff;
        border-radius: 3px;
        padding: 1px;
        z-index: 2;
        .selectDate{
            width: 100%;
            height: 28px;
            border-radius: 2px;
            padding-left: 45px;
            p:nth-child(1){
                width: 68px;
                height: 28px;
                float: left;
                position: relative;
                cursor: pointer;
                .scrollbar{
                    position: absolute;
                    top: 28px;
                    left: 0;
                    ul{
                        li{
                            line-height: 20px;
                            color: #fbfbfb;
                            text-shadow: 0 1px rgba(0, 0, 0, 0.3);
                            cursor: pointer;
                            &:hover{
                                color: #3d7400;
                                
                            }
                        }
                    }
                }
            }
            p:nth-child(2){
                width: 68px;
                height: 28px;
                float: left;
                position: relative;
                cursor: pointer;
                .scrollbar{
                    position: absolute;
                    top: 28px;
                    left: 0;
                    ul{
                        li{
                            line-height: 20px;
                            color: #fbfbfb;
                            text-shadow: 0 1px rgba(0, 0, 0, 0.3);
                            cursor: pointer;
                            &:hover{
                                color: #3d7400;
                                
                            }
                        }
                    }
                }
            }
        }
        .selectMonth{
            padding-left: 80px;
        }
        .selectYear{
            padding-left: 0px;
            text-align: center;
            line-height: 26px;
            color: #fbfbfb;
            text-shadow: 0 1px 0 rgba(0, 0, 0, 0.38);
            i.icon_left{
                width: 50px;
                display: block;
                text-align: center;
                line-height: 26px;
                float: left;
                color: #fbfbfb;
                text-shadow: 0 1px 0 rgba(0, 0, 0, 0.38);
                cursor: pointer;
            }
            i.icon_right{
                width: 50px;
                display: block;
                float: right;
                text-align: center;
                line-height: 26px;
                color: #fbfbfb;
                 text-shadow: 0 1px 0 rgba(0, 0, 0, 0.38);
                cursor: pointer;
            }

        }
        .box{
            width: 100%;
            height: 174px;
            padding: 4px;
            span{
                display: block;
                width: 33.33%;
                height: 25%;
                float: left;
                text-align: center;
                i{
                    width: 36px;
                    height: 22px;
                    display: block;
                    margin: 0 auto;
                    margin-top: 10px;
                    color: #474843;
                    text-shadow: 0 1px rgba(255, 255, 255, 0.7);
                    cursor: pointer;
                    font-size: 12px;
                    line-height: 22px;
                }
                .tag3{
                    background: linear-gradient(#a1cd52,#73b829);
                    border-radius: 2px;
                    box-shadow: 0 1px 1px #2f8a00,0 1px 2px rgba(255,255,255,0.3) inset;
                    color: #fbfbfb;
                    text-shadow: 0 -1px rgba(0,0,0,0.3);
                }
                .tag4{
                    background: linear-gradient(#f4adb5,#f17679);
                    border-radius: 2px;
                    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5),0 1px 2px rgba(255,255,255,0.3) inset;
                    color: #fbfbfb;
                    text-shadow: 0 -1px rgba(0,0,0,0.3);
                }
                &:hover{
                    i{
                        background: linear-gradient(#a1cd52,#73b829);
                        border-radius: 2px;
                        box-shadow: 0 1px 1px #2f8a00,0 1px 2px rgba(255,255,255,0.3) inset;
                        color: #fbfbfb;
                        text-shadow: 0 -1px rgba(0,0,0,0.3);
                    }
                }
            }
        }
        .datelist{
            width: 100%;
            padding: 4px;
            .week{
                width: 100%;
                height: 32px;
                span{
                    display: block;
                    width: calc(100% / 7);
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    float: left;
                    
                }
            }   
            .box{
                width: 100%;
                height: 134px;
                border-radius: 3px;
                padding: 2px 0;
                p{
                    width: 100%;
                    height: 22px;
                    span{
                        display: block;
                        width: 22px;
                        height: 22px; 
                        float: left;
                        text-align: center;
                        line-height: 20px;
                        margin:0 5px;
                        cursor: pointer;
                        &:hover{
                            background: linear-gradient(#a1cd52,#73b829);
                            border-radius: 2px;
                            box-shadow: 0 1px 1px #2f8a00,0 1px 2px rgba(255,255,255,0.3) inset;
                            color: #fbfbfb;
                            text-shadow: 0 -1px rgba(0,0,0,0.3);
                        }
                    }
                    .tag1{
                        color: #c5bdbd;
                        text-shadow: 0 1px rgba(255, 255, 255, 0.5);
                    }
                    .tag0{
                        color: #474843;
                        text-shadow: 0 1px rgba(255, 255, 255, 0.7);
                    }
                    .tag2{
                        color: #c5bdbd;
                        text-shadow: 0 1px rgba(255, 255, 255, 0.5);
                    }
                    .tag3{
                        background: linear-gradient(#a1cd52,#73b829);
                        border-radius: 2px;
                        box-shadow: 0 1px 1px #2f8a00,0 1px 2px rgba(255,255,255,0.3) inset;
                        color: #fbfbfb;
                        text-shadow: 0 -1px rgba(0,0,0,0.3);
                    }
                    .tag4{
                        background: linear-gradient(#f4adb5,#f17679);
                        border-radius: 2px;
                        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5),0 1px 2px rgba(255,255,255,0.3) inset;
                        color: #fbfbfb;
                        text-shadow: 0 -1px rgba(0,0,0,0.3);
                    }
                }
            }
        }
        .monthlist{
            width: 100%;
            height: 174px;
            padding: 4px;
            span{
                display: block;
                width: 33.33%;
                height: 25%;
                float: left;
                text-align: center;
                i{
                    width: 22px;
                    height: 22px;
                    display: block;
                    margin: 0 auto;
                    margin-top: 10px;
                    color: #474843;
                    text-shadow: 0 1px rgba(255, 255, 255, 0.7);
                    cursor: pointer;
                    font-size: 14px;
                    line-height: 22px;
                }
                &:hover{
                    i{
                       background: linear-gradient(#a1cd52,#73b829);
                        border-radius: 2px;
                        box-shadow: 0 1px 1px #2f8a00,0 1px 2px rgba(255,255,255,0.3) inset;
                        color: #fbfbfb;
                        text-shadow: 0 -1px rgba(0,0,0,0.3);
                    }
                }
                .tag3{
                    background: linear-gradient(#a1cd52,#73b829);
                    border-radius: 2px;
                    box-shadow: 0 1px 1px #2f8a00,0 1px 2px rgba(255,255,255,0.3) inset;
                    color: #fbfbfb;
                    text-shadow: 0 -1px rgba(0,0,0,0.3);
                }
                .tag4{
                    background: linear-gradient(#f4adb5,#f17679);
                    border-radius: 2px;
                    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5),0 1px 2px rgba(255,255,255,0.3) inset;
                    color: #fbfbfb;
                    text-shadow: 0 -1px rgba(0,0,0,0.3);
                }
            }
        }
        .isempty-month{
            width: 100%;
            height: 36px;
            padding: 5px 0 5px 0;
            border-top: 1px solid #4d527f;
            i:nth-child(1){
                float: right;
                display: block;
                width: 46px;
                height: 24px;
                background: linear-gradient(#8895df, #5a66b6);
                box-shadow: 0 2px #32356f, 0 1px 2px rgba(255, 255, 255, 0.3) inset;
                color: #2d3473;
                text-shadow: 0 1px rgba(255, 255, 255, 0.3);
                border-radius: 2px;
                margin-right: 7px;
                text-align: center;
                line-height: 24px;
                letter-spacing: 1px;
                cursor: pointer;
            }
            i:nth-child(2){
                float: right;
                display: block;
                width: 46px;
                height: 24px;
                background: linear-gradient(#f4adb5, #f17679);
                box-shadow: 0 2px #a24346, 0 1px 2px rgba(255, 255, 255, 0.3) inset;
                color: #6a0003;
                text-shadow: 0 1px rgba(255, 255, 255, 0.3);
                border-radius: 2px;
                margin-right: 7px;
                text-align: center;
                line-height: 24px;
                letter-spacing: 1px;
                cursor: pointer;
            }
        }
        .isempty{
            width: 100%;
            height: 36px;
            padding: 5px 0 5px 0;
            i:nth-child(1){
                float: right;
                display: block;
                width: 46px;
                height: 24px;
                background: linear-gradient(#8895df, #5a66b6);
                box-shadow: 0 2px #32356f, 0 1px 2px rgba(255, 255, 255, 0.3) inset;
                color: #2d3473;
                text-shadow: 0 1px rgba(255, 255, 255, 0.3);
                border-radius: 2px;
                margin-right: 7px;
                text-align: center;
                line-height: 24px;
                letter-spacing: 1px;
                cursor: pointer;
            }
            i:nth-child(2){
                float: right;
                display: block;
                width: 46px;
                height: 24px;
                background: linear-gradient(#f4adb5, #f17679);
                box-shadow: 0 2px #a24346, 0 1px 2px rgba(255, 255, 255, 0.3) inset;
                color: #6a0003;
                text-shadow: 0 1px rgba(255, 255, 255, 0.3);
                border-radius: 2px;
                margin-right: 7px;
                text-align: center;
                line-height: 24px;
                letter-spacing: 1px;
                cursor: pointer;
            }
        }
    }
}
</style>
