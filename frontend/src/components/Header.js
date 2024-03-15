import '../material-kit.css';

const Header = () => {
  return (
    <header class="header-2">
        <div class="page-header min-vh-75 relative" style={{ backgroundImage: `url('./assets/images/bg.webp')` }}>
            <span class="mask bg-gradient-primary opacity-4"></span>
            <div class="container">
                <div class="row">
                    <div class="col-lg-7 text-center mx-auto">
                        <h1 class="pt-3 mt-n5" style={{ color: '#FFF8E7', WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'black' }}>Type Aid</h1>
                        <p class="lead mt-3" style={{ color: '#FFF8E7', WebkitTextStrokeWidth: '0.1px', WebkitTextStrokeColor: 'black' }}>Your assistive typing platform and text editor providing you a comprehensive solution designed to enhance the typing experience.</p>
                    </div>
                </div>
            </div>
        </div>
    </header>
  );
}

export default Header;
