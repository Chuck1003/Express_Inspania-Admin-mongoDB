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
            detail = <p>身高：180CM， 体重：66KG， 颜值：96.9， 肤色：96</p>
        }else {
            detail = <p>身高：165CM， 体重：62KG， 颜值：72， 肤色：66</p>
        }

        return (
            <div>{detail}</div>
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
            <strong>现在是北京时间： {this.state.date.toLocaleTimeString()}</strong>
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
            <div className="event" style={{background: this.state.isToggleOn ? '#f00':'#000'}}>
                {/* ②<button onClick={(e) => this.handleClick(e)}> */}
                {/* ①<button onClick={this.handleClick.bind(this)}> */}
                <button onClick={this.handleClick}>
                    {this.state.isToggleOn ? '关灯' : '开灯'}
                </button>
            </div>
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
            <ul>
                {
                    NumberList.map((v)=>
                        <li key={v.toString()}>{v * 2} 这是第{v}个</li>
                    )
                }
            </ul>
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
            <form onSubmit={this.handleSubmit}>
                <label>Name:
                    <input type="text" value={this.state.value} onChange={this.handelChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
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
            <div>
                <pre>
                    <p>/** 1.时间组件，涉及生命周期钩子，组件自动更新状态（状态state是私有的） */</p>
                    <div className="header">
                        <strong className="title">Hello, React!</strong>
                        <Time />
                    </div>
                </pre>

                <pre>
                    <p>/** 2.props属性传值（属性是传给组件的数据） */</p>
                    <Shape isHandsome={true} />
                </pre>

                <pre>
                    <p>/** 3.事件处理（①、内联style属性写法双大括号；②、jsx回调中的this,类方法默认不会绑定this） */</p>
                    <Toggle />
                </pre>

                <pre>
                    <p>/** 4.列表&key（在map()方法的内部调用元素时，加key，key是不能被读取到的） */</p>
                    <NumberList numbers={[1,2,3,4,5]} />
                </pre>

                <pre>
                    <p>/** 5.表单，所有的表单使用value，onChange，onSubmit等事件来绑定（同vue） */</p>
                    <Form />
                </pre>

                <pre>
                    <p>/** 高级指引 **/</p>
                </pre>
            </div>
        )
    }
}

ReactDOM.render(
    <User />,
    document.getElementById('root')
);