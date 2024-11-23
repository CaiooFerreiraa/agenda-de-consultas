const index = (req, res) => {
    res.render('help.ejs');
};

const previous = (req, res) => {
    res.redirect('/login')
}

export default {
    index,
    previous
};