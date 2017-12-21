import React, { Component } from "react";
import "./Home.css";
import { Cards } from "../../components/Cards";
import {Col, Row, Container} from "../../components/Grid";
import maylineChair from "../../components/Cards/img/mayline_chair.png";
import sauderDesk from "../../components/Cards/img/sauder_desk.png";
// import Rnd from "react-rnd"
import Rnd from "react-rnd-rotate"
import {database} from "./firebase";


class Home extends Component {

  state = {
  	images: [maylineChair, sauderDesk ],
    imagesTop: ["/images2/maylineChair.jpg",],
  	roomRatio: {
  		x: 1,
  		y: 1
  	},
    room: {
      id: "room",
      position: {x: 0, y: 0},
      size: {width: 500, height: 300}
    },
  	modelsData: [
      {id: "roomRatio", ratio: {x: 500, y: 300}},
      {id: "Mayline Chair", degree: 0, position: {x: 0, y: 0}, size: {width: 100, height: 100}},
      {id: "Sauder Desk", degree: 0, position: {x: 50, y: 50}, size: {width: 100, height: 100}},
  	]
  };


  componentDidMount(){

  }

  componentDidUpdate(){
    this.updateDatabase();
  }

  updateDatabase = () =>{
    let modelsData = this.state.modelsData;
    database.ref("-L0lnD2HZtHWqW9cmZYk").set(modelsData);
  }


  render(){
    console.log("==========================", this.state);

    return(
    	<Container fluid>
    		<Row>
	        	<Col size = "col-md-10 order-md-2">
	        		<div id="arrange-room">
                <Rnd
                  style={{background: "#4fb8f9"}}
                  dragGrid={[25,25]}
                  resizeGrid={[25,25]}
                  size={{width: this.state.modelsData[0].ratio.x, height: this.state.modelsData[0].ratio.y}}
                  position={{x: this.state.room.position.x, y: this.state.room.position.y}}
                  onDragStop={(e,d)=>{
                    let room = Object.assign({}, this.state.room);
                    room.position.x = d.x;
                    room.position.y = d.y;
                    this.setState({
                      room
                    })}}
                  onResize={(e,direction,ref,delta,position)=>{
                    let modelsData = Object.assign({}, this.state.modelsData);
                    modelsData[0].ratio.x = ref.offsetWidth;
                    modelsData[0].ratio.y = ref.offsetHeight;
                    this.setState({
                      modelsData
                    })}}
                >
                  Your Room
                </Rnd>
                <Rnd
                  style={{background: "#fff"}}
                  dragGrid={[25,25]}
                  size={{width: this.state.modelsData[1].size.width, height: this.state.modelsData[1].size.height}}
                  position={{x: this.state.modelsData[1].position.x, y: this.state.modelsData[1].position.y}}
                  onDragStop={(e,d)=>{
                    let modelsData = Object.assign({}, this.state.modelsData);
                    modelsData[1].position.x = d.x;
                    modelsData[1].position.y = d.y;
                    modelsData[1].degree = d.degree;
                    this.setState({
                      modelsData
                  })}}
                >
                  Mayline Chair
                </Rnd>
                <Rnd
                  style={{background: "#fdf"}}
                  size={{width: this.state.modelsData[2].size.width, height: this.state.modelsData[2].size.height}}
                  position={{x: this.state.modelsData[2].position.x, y: this.state.modelsData[2].position.y}}
                  onDragStop={(e,d)=>{
                    let modelsData = Object.assign({}, this.state.modelsData);
                    modelsData[2].position.x = d.x;
                    modelsData[2].position.y = d.y;
                    modelsData[2].degree = d.degree;
                    console.log("====================eeeee",e);
                    console.log("====================ddddd",d);
                    this.setState({
                      modelsData
                  })}}
                >
                <img className="img-fluid" src={this.state.imagesTop[0]} draggable="false" />
                  Sauder Desk
                </Rnd>
	        		</div>
	        	</Col>

    			<Col size = "col-md-2 order-md-1">
	    			<div id="furnituresDiv">
				        <Cards
				        	src={this.state.images[0]}
				        	alt={this.state.modelsData[0].id}
				        >
				        	<h6>{this.state.modelsData[0].id}</h6>
				        </Cards>
				    </div>
	        	</Col>
	        </Row>
	    </Container>
      )
  }

}

export default Home;
