import f0 from './fruits/tile000.png'
import f1 from './fruits/tile001.png'
import f2 from './fruits/tile002.png'
import f3 from './fruits/tile003.png'
import f4 from './fruits/tile004.png'
import f5 from './fruits/tile005.png'
import f6 from './fruits/tile006.png'
import f7 from './fruits/tile007.png'
import f8 from './fruits/tile008.png'
import f9 from './fruits/tile009.png'
import f10 from './fruits/tile010.png'
import f11 from './fruits/tile011.png'
import f12 from './fruits/tile012.png'
import f13 from './fruits/tile013.png'
import f14 from './fruits/tile014.png'
import hided_img from './hidden.png'

const fruits = [
	{k: 0, id: 0, img: f0, alt: 'tile000', hidden: hided_img, visible: false},
	{k: 1, id: 1, img: f1, alt: 'tile001', hidden: hided_img, visible: false},
	{k: 2, id: 2, img: f2, alt: 'tile002', hidden: hided_img, visible: false},
	{k: 3, id: 3, img: f3, alt: 'tile003', hidden: hided_img, visible: false},
	{k: 4, id: 4, img: f4, alt: 'tile004', hidden: hided_img, visible: false},
	{k: 5, id: 5, img: f5, alt: 'tile005', hidden: hided_img, visible: false},
	{k: 6, id: 6, img: f6, alt: 'tile006', hidden: hided_img, visible: false},
	{k: 7, id: 7, img: f7, alt: 'tile007', hidden: hided_img, visible: false},
	{k: 8, id: 8, img: f8, alt: 'tile008', hidden: hided_img, visible: false},
	{k: 9, id: 9, img: f9, alt: 'tile009', hidden: hided_img, visible: false},
	{k: 10, id: 10, img: f10, alt: 'tile010', hidden: hided_img, visible: false},
	{k: 11, id: 11, img: f11, alt: 'tile011', hidden: hided_img, visible: false},
	{k: 12, id: 12, img: f12, alt: 'tile012', hidden: hided_img, visible: false},
	{k: 13, id: 13, img: f13, alt: 'tile013', hidden: hided_img, visible: false},
	{k: 14, id: 14, img: f14, alt: 'tile014', hidden: hided_img, visible: false},

]

function imagesLoader(nombre)
{
	return fruits.slice(0, nombre);
}

export default imagesLoader;