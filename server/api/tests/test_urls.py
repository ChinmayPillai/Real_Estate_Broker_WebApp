from django.test import SimpleTestCase
from django.urls import resolve, reverse
from api.views import property_list, property_by_id, buy_orders, sell_orders, funds, watchlist, portfolio, marketOrder, limitOrder, register, login, get_user, support

class TestUrls(SimpleTestCase):
    
        def test_property_list_url_resolves(self):
            url = reverse('property_list')
            self.assertEqual(resolve(url).func, property_list)
    
        def test_property_by_id_url_resolves(self):
            url = reverse('property_by_id', args=[1])
            self.assertEqual(resolve(url).func, property_by_id)
    
        def test_buy_orders_url_resolves(self):
            url = reverse('buy_orders', args=[1])
            self.assertEqual(resolve(url).func, buy_orders)
    
        def test_sell_orders_url_resolves(self):
            url = reverse('sell_orders', args=[1])
            self.assertEqual(resolve(url).func, sell_orders)
    
        def test_funds_url_resolves(self):
            url = reverse('funds', args=[1])
            self.assertEqual(resolve(url).func, funds)
    
        def test_watchlist_url_resolves(self):
            url = reverse('watchlist', args=[1])
            self.assertEqual(resolve(url).func, watchlist)
    
        def test_portfolio_url_resolves(self):
            url = reverse('portfolio', args=[1])
            self.assertEqual(resolve(url).func, portfolio)
    
        def test_market_order_url_resolves(self):
            url = reverse('market_order')
            self.assertEqual(resolve(url).func, marketOrder)
    
        def test_limit_order_url_resolves(self):
            url = reverse('limit_order')
            self.assertEqual(resolve(url).func, limitOrder)
    
        def test_register_url_resolves(self):
            url = reverse('register')
            self.assertEqual(resolve(url).func, register)
    
        def test_login_url_resolves(self):
            url = reverse('login')
            self.assertEqual(resolve(url).func, login)
    
        def test_get_user_url_resolves(self):
            url = reverse('get_user', args=[1])
            self.assertEqual(resolve(url).func, get_user)
    
        def test_support_url_resolves(self):
            url = reverse('support')
            self.assertEqual(resolve(url).func, support)