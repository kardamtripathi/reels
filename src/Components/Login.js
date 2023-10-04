import * as React from 'react';
import {useState, useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './Login.css'
import insta from '../Assets/instaLogo.png'
import { Link, useNavigate } from 'react-router-dom';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import bg from '../Assets/bg.png'
import bg1 from '../Assets/bg1.png'
import img1 from '../Assets/img1.jpg'
import img2 from '../Assets/img2.jpg'
import img3 from '../Assets/img3.jpg'
import img4 from '../Assets/img4.jpg'
import img5 from '../Assets/img5.jpg'
import image1 from '../Assets/image1.png'
import {AuthContext} from '../Context/AuthContext'
export default function Login() {
    const store = useContext(AuthContext)
    console.log(store);
    const useStyles = makeStyles({
        text1: {
            color: 'grey',
            textAlign: 'center'
        },
        text2: {
            textAlign: 'center'
        },
        card2: {
            marginTop: '2%'
        }
    })
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const login = useContext(AuthContext);
    const handleClick = async() => {
        try{
            setError('');
            setLoading(true);
            let res = await store.login(email, password);
            setLoading(false);
            navigate('/');
        }
        catch(err){
            setError(err.message);
            setTimeout(() => {
                setError('')
            }, 5000)
            setLoading(false)
        }
    }
    return (
        <div className='loginWrapper'>
            <div className='imgCarousel' style={{ backgroundImage: 'url(' + bg1 + ')', backgroundSize: 'cover' }}>
                <div className='carousel'>
                    <CarouselProvider
                        visibleSlides={1}
                        totalSlides={5}
                        naturalSlideHeight={900}
                        naturalSlideWidth={423}
                        hasMasterSpinner
                        isPlaying={true}
                        infinite={true}
                        dragEnabled={false}
                        touchEnabled={false}
                    >
                        <Slider>
                            <Slide index={0}><Image src={image1} style={{borderRadius: '6%'}} /></Slide>
                            <Slide index={1}><Image src={img2} style={{borderRadius: '8%'}} /></Slide>
                            <Slide index={2}><Image src={img3} style={{borderRadius: '8%'}} /></Slide>
                            <Slide index={3}><Image src={img4} style={{borderRadius: '8%'}} /></Slide>
                            <Slide index={4}><Image src={img5} style={{borderRadius: '8%'}} /></Slide>
                        </Slider>
                    </CarouselProvider>
                </div>
            </div>
            <div className='loginCard'>
                <Card variant='outlined'>
                    <div className='insta-logo'>
                        <img src={insta} alt='logo'/>
                    </div>
                    <CardContent>
                        {error!='' && <Alert severity="error">{error}</Alert>}
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin='dense' size='small' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' size='small' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <Typography className={classes.text2} color="primary" variant='subtitle1'>
                            Forgot Password?
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" fullWidth="true" variant="contained" onClick={handleClick} disabled={loading}>
                            {loading ? "Logging in" : "Login"}
                        </Button>
                    </CardActions>
                </Card>
                <Card variant='outlined' className={classes.card2}>
                    <CardContent>
                        <Typography className={classes.text1} variant='subtitile1'>
                            Don't have an account? <Link to='/signup' style={{ textDecoration: 'none' }}>Signup</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}