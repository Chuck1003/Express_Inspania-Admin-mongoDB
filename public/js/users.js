/**
 * props & 组件
 */
class Shape extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isHandsome: props.isHandsome
        }
    }

    render(){
        const isHandsome = this.state.isHandsome;
        let detail = null;

        console.log(isHandsome);
        if(isHandsome){
            detail = React.createElement("p", null, "身高：180CM， 体重：66KG， 颜值：96.9， 肤色：96")
        }else {
            detail = React.createElement("p", null, "身高：165CM， 体重：62KG， 颜值：72， 肤色：66")
        }

        return (
            React.createElement("div", null, detail)
        )
    }
}

/**
 * state & 生命周期
 */
class Time extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date()
        }
    }

    /**
     * 组件的生命周期钩子
     */
    componentDidMount() {
        this.timerID = setInterval(
            () => this.setState({
                date: new Date()
            }),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            React.createElement("strong", null, "现在是北京时间： ", this.state.date.toLocaleTimeString())
        )
    }
}

/**
 * 事件处理
 */
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        // ①手动绑定this
        this.handleClick = this.handleClick.bind(this);
        // ②在回调函数中使用箭头函数↓ 有一定的性能问题！详见事件处理章节
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            React.createElement("div", {className: "event", style: {background: this.state.isToggleOn ? '#f00':'#000'}}, 
                /* ②<button onClick={(e) => this.handleClick(e)}> */
                /* ①<button onClick={this.handleClick.bind(this)}> */
                React.createElement("button", {onClick: this.handleClick}, 
                    this.state.isToggleOn ? '关灯' : '开灯'
                )
            )
        );
    }
}

/**
 * 条件渲染
 * 同js的判断语句
 */

/**
 * key & 列表
 */
class NumberList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            numbers: props.numbers
        }
    }

    render() {
        const NumberList = this.state.numbers;
        // const ItemList = NumberList.map((v)=>
        //     <li key={v.toString()}>{v * 2} 这是第{v}个</li>
        // )

        // return (
        //     <ul className="list">{ItemList}</ul>
        // )
        return (
            React.createElement("ul", null, 
                
                    NumberList.map((v)=>
                        React.createElement("li", {key: v.toString()}, v * 2, " 这是第", v, "个")
                    )
                
            )
        )
    }
}

/**
 * 表单
 */
class Form extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handelChange = this.handelChange.bind(this);
    }

    handleSubmit(event){
        alert('A name was Submited：' + this.state.value);
        event.preventDefault();
    }
    handelChange(event){
        this.setState({
            value: event.target.value
        })
    }

    render(){
        return (
            React.createElement("form", {onSubmit: this.handleSubmit}, 
                React.createElement("label", null, "Name:", 
                    React.createElement("input", {type: "text", value: this.state.value, onChange: this.handelChange})
                ), 
                React.createElement("input", {type: "submit", value: "Submit"})
            )
        )
    }
}

/**
 * 状态提升
 */
class Calculate extends React.Component {

}

/**
 * 组合 VS 继承 （组合胜，推荐使用组合而不是用继承）
 */
class Dialog extends React.Component {

}

/**
 * React 理念
 */


/**
 * 主组件
 */
class User extends React.Component {
    render() {
        return (
            React.createElement("div", null, 
                React.createElement("pre", null, 
                    React.createElement("p", null, "/** 1.时间组件，涉及生命周期钩子，组件自动更新状态（状态state是私有的） */"), 
                    React.createElement("div", {className: "header"}, 
                        React.createElement("strong", {className: "title"}, "Hello, React!"), 
                        React.createElement(Time, null)
                    )
                ), 

                React.createElement("pre", null, 
                    React.createElement("p", null, "/** 2.props属性传值（属性是传给组件的数据） */"), 
                    React.createElement(Shape, {isHandsome: true})
                ), 

                React.createElement("pre", null, 
                    React.createElement("p", null, "/** 3.事件处理（①、内联style属性写法双大括号；②、jsx回调中的this,类方法默认不会绑定this） */"), 
                    React.createElement(Toggle, null)
                ), 

                React.createElement("pre", null, 
                    React.createElement("p", null, "/** 4.列表&key（在map()方法的内部调用元素时，加key，key是不能被读取到的） */"), 
                    React.createElement(NumberList, {numbers: [1,2,3,4,5]})
                ), 

                React.createElement("pre", null, 
                    React.createElement("p", null, "/** 5.表单，所有的表单使用value，onChange，onSubmit等事件来绑定（同vue） */"), 
                    React.createElement(Form, null)
                )
            )
        )
    }
}

ReactDOM.render(
    React.createElement(User, null),
    document.getElementById('root')
);