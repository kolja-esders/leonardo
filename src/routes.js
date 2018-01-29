import HomePage from './components/App.vue'
import QuestionPage from './pages/QuestionPage.vue'

const About = { template: '<p>about page</p>' }

const routes = [{
  path: '/',
  component: HomePage
}, {
  path: '/about',
  component: About
}, {
  path: '/questions/:id',
  component: QuestionPage
}]

export default routes;
