import { library } from '@fortawesome/fontawesome-svg-core'
import {
	IconDefinition,
	faAnchor,
	faBath,
	faBed,
	faBeerMug,
	faBinoculars,
	faBird,
	faBriefcase,
	faBuoyMooring,
	faBurger,
	faBus,
	faCableCar,
	faCactus,
	faCampfire,
	faCampground,
	faCar,
	faCarTunnel,
	faChildReaching,
	faCrab,
	faDeer,
	faDog,
	faDolphin,
	faDropletDegree,
	faEarthAmericas,
	faElephant,
	faFerry,
	faFishFins,
	faFrog,
	faGhost,
	faHotel,
	faHouse,
	faHouseWater,
	faJetFighter,
	faLocationCheck,
	faLocationExclamation,
	faLocationMinus,
	faLocationPin,
	faLocationPlus,
	faLocationQuestion,
	faLocationSmile,
	faLocationXmark,
	faMap,
	faMapMarkerAlt,
	faMaskSnorkel,
	faMonkey,
	faMoped,
	faMound,
	faMountain,
	faMountainSun,
	faMountains,
	faMugSaucer,
	faPassport,
	faPawSimple,
	faPersonBiking,
	faPersonBikingMountain,
	faPersonHiking,
	faPersonRunning,
	faPersonSkiLift,
	faPersonSkiing,
	faPersonSledding,
	faPlane,
	faPlaneArrival,
	faPlaneDeparture,
	faPopcorn,
	faRestroom,
	faRingDiamond,
	faRoute,
	faRv,
	faShip,
	faShrimp,
	faSignsPost,
	faSlotMachine,
	faSpa,
	faSquid,
	faStore,
	faTablePicnic,
	faTaxi,
	faTent,
	faTrain,
	faTrainSubway,
	faTrainTram,
	faTree,
	faTreeDeciduous,
	faTreePalm,
	faTrees,
	faTruck,
	faTurtle,
	faUmbrellaBeach,
	faUnicorn,
	faVanShuttle,
	faVolcano,
	faWater,
	faWaterLadder,
	faWhale,
} from '@fortawesome/pro-solid-svg-icons'

export const AVAILABLE_ICONS: IconDefinition[] = [
	faMapMarkerAlt,
	faLocationPin,
	faLocationXmark,
	faLocationSmile,
	faLocationQuestion,
	faLocationPlus,
	faLocationMinus,
	faLocationExclamation,
	faLocationCheck,
	faHouse,
	faBriefcase,
	faMap,
	faSignsPost,
	faBath,
	faRestroom,
	faRoute,
	faStore,
	faSlotMachine,
	faSpa,
	faWater,
	faWaterLadder,
	faHouseWater,
	faDropletDegree,
	faUmbrellaBeach,
	faTreePalm,
	faPassport,
	faEarthAmericas,
	faTree,
	faTrees,
	faTreeDeciduous,
	faCactus,
	faMountain,
	faMountains,
	faMountainSun,
	faVolcano,
	faMound,
	faBed,
	faHotel,
	faTent,
	faCampground,
	faCampfire,
	faBuoyMooring,
	faAnchor,
	faMaskSnorkel,
	faPersonRunning,
	faPersonHiking,
	faPersonBiking,
	faPersonBikingMountain,
	faPersonSkiLift,
	faPersonSkiing,
	faPersonSledding,
	faBinoculars,
	faChildReaching,
	faPlane,
	faPlaneDeparture,
	faPlaneArrival,
	faJetFighter,
	faCar,
	faCarTunnel,
	faBus,
	faCableCar,
	faMoped,
	faVanShuttle,
	faTrain,
	faTrainTram,
	faTrainSubway,
	faTaxi,
	faTruck,
	faRv,
	faShip,
	faFerry,
	faTablePicnic,
	faMugSaucer,
	faPopcorn,
	faBurger,
	faBeerMug,
	faFishFins,
	faDolphin,
	faCrab,
	faWhale,
	faShrimp,
	faSquid,
	faTurtle,
	faBird,
	faElephant,
	faFrog,
	faDeer,
	faMonkey,
	faUnicorn,
	faDog,
	faPawSimple,
	faRingDiamond,
	faGhost,
]

export function AddToLibrary() {
	library.add(...AVAILABLE_ICONS)
}