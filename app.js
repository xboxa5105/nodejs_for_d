import cookieParser from 'cookie-parser';
import express from 'express';
import { indexRouter } from './routes/index';
import { logger_file, logger_console } from './middleware/morgan'
import path from 'path';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// log
app.use(logger_file)
app.use(logger_console)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.get('*', (req, res) => {
  res.render('error', { error: { message: "page not found!" } })
})

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
