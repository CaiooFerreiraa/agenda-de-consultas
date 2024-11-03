const index = (req, res) => {
    res.render('help.ejs');
};

const previus = (req, res) => {
    res.redirect('/login')
}

export default {
    index,
    previus
};