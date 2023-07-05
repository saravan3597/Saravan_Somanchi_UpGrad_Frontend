import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import '../products/products.css';
import store from '../../store/store';


const categories = [
    {
        id: -1,
        name: 'All'
    },
    {
        id: 1,
        name: 'Apparels'
    },
    {
        id: 2,
        name: 'Electronics'
    },
    {
        id: 3,
        name: 'Footwear'
    },
    {
        id: 4,
        name: 'Personal Care'
    }
];

const sortOrders = [
    {
        id: -1,
        name: 'Default'
    },
    {
        id: 1,
        name: 'Price : Hight to Low'
    },
    {
        id: 2,
        name: 'Price : Low to High'
    },
    {
        id: 3,
        name: 'Newest'
    },
];

const productsList = [
    {
        name: 'Nike Jordan Dryfit',
        imageSrc: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/95f70822-aac4-49f9-8b1f-d9e38c9256d0/jordan-dri-fit-sport-t-shirt-n3lwwm.png',
        description: 'This sweat-wicking tee flexes from the court to the street',
        price: 1995,
        categoryCodeId: 1,
        dateTimeAdded: 2
    },
    {
        name: 'iPhone 14 Pro',
        imageSrc: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209_GEO_US?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753617560',
        description: '48MP Main Ultra Wide Telephoto. Up to 29 hours video playback',
        price: 120000,
        categoryCodeId: 2,
        dateTimeAdded: 3
    },
    {
        name: 'Nike Downshifter',
        imageSrc: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/d584cab5-70c5-427b-ac01-96e34059da2a/downshifter-12-road-running-shoes-kQLnZn.png',
        description: 'Take those first steps on your running journey in the Nike Downshifter 12',
        price: 3995,
        categoryCodeId: 3,
        dateTimeAdded: 1
    },
    {
        name: 'Minimalist Face Serum',
        imageSrc: 'https://images-static.nykaa.com/media/catalog/product/f/8/f8ee060MINIM00000001_1.jpg',
        description: '10% Niacinamide Face Serum With Matmarine + Zinc For Reducing Oil & Blemishes',
        price: 569,
        categoryCodeId: 4,
        dateTimeAdded: 4
    },
]

export default class Products extends React.Component {
    constructor() {
        super();
        this.state = {
            category: -1,
            sortBy: -1,
            productsList: productsList,
            categories: categories,
            sortOrders: sortOrders
        }
    }
    render() {
        store.subscribe(() => {
            const storeState = store.getState();
            const searchString = storeState.searchString;
            let newProductsList = JSON.parse(JSON.stringify(productsList));
            newProductsList = newProductsList.filter(product => product.name.toUpperCase().includes(searchString.toUpperCase()));
            this.setState({ productsList: newProductsList });
        });
        const handleCategoryChange = (event, newCategory) => {
            this.setState({ category: newCategory });
            setTimeout(() => {
                if (this.state.category === -1) {
                    this.setState({ productsList: productsList });
                } else {
                    const newProductsList = productsList.filter(item => item.categoryCodeId === this.state.category);
                    this.setState({ productsList: newProductsList });
                }
            });
        };

        const handleSortChange = (event) => {
            this.setState({ sortBy: event.target.value });
            this.setState({ category: -1 });
            setTimeout(() => {
                if (this.state.sortBy === -1) {
                    this.setState({ productsList: productsList });
                } else {
                    let newProductsList = JSON.parse(JSON.stringify(productsList));
                    switch (this.state.sortBy) {
                        case 1: {
                            newProductsList = newProductsList.sort((a, b) => b.price - a.price);
                            break;
                        }
                        case 2: {
                            newProductsList = newProductsList.sort((a, b) => a.price - b.price);
                            break;
                        }
                        case 3: {
                            newProductsList = newProductsList.sort((a, b) => a.dateTimeAdded - b.dateTimeAdded);
                            break;
                        }
                    }
                    this.setState({ productsList: newProductsList });
                }
            });
        };

        const navigateToProductDetailPage = (product) => {
            const category = categories.find(item => item.id === product.categoryCodeId);
            product.category = category;
            localStorage.setItem('upgrad_eshop_product', JSON.stringify(product));
        }

        return (
            <>
                <div className='productsContainer'>
                    <div className='productsHandler'>
                        <div className='productsToggle'>
                            <ToggleButtonGroup
                                sx={{ background: '#d3d3d36e', color: 'grey' }}
                                value={this.state.category}
                                exclusive
                                onChange={handleCategoryChange}
                                aria-label="Categories"
                            >
                                {this.state.categories.map((category, index) => {
                                    return <ToggleButton key={index} value={category.id}>{category.name}</ToggleButton>
                                })}
                            </ToggleButtonGroup>
                        </div>
                        <div className='productsSort'>
                            <Box sx={{ minWidth: 200, maxWidth: 200 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.sortBy}
                                        label="Sort By"
                                        onChange={handleSortChange}
                                    >
                                        {this.state.sortOrders.map((order, index) => {
                                            return <MenuItem key={index} value={order.id}>{order.name}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>
                    <div className='products'>
                        {
                            this.state.productsList.map((product, index) => {
                                return (<Card key={index} sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        sx={{ height: 200 }}
                                        image={product.imageSrc}
                                        title={product.name}
                                    />
                                    <CardContent sx={{ minHeight: '120px', maxHeight: '120px' }}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.description}
                                        </Typography>
                                        <Typography variant="body2" color="text.primary" fontWeight={600} marginTop={1}>
                                            ₹ {product.price}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size='small' variant='contained' sx={{ backgroundColor: '#3f51b5' }} href='/productDetail' onClick={() => { navigateToProductDetailPage(product) }}>Buy</Button>
                                    </CardActions>
                                </Card>)
                            })
                        }
                    </div>
                </div>
            </>
        );
    }
}