from django.db import models

# Create your models here.


class Property(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)

    def __str__(self):
        return self.name


class UserProfile(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    funds = models.PositiveIntegerField()
    money_invested = models.PositiveIntegerField()
    pnl = models.IntegerField()
    portfolio = models.ManyToManyField(Property, related_name='portfolio')
    watchlist = models.ManyToManyField(Property, related_name='watchlist')

    def __str__(self):
        return self.name


class Order(models.Model):
    ORDER_TYPES = (
        ('buy', 'Buy'),
        ('sell', 'Sell'),
    )
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    prop = models.ForeignKey(Property, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    order_type = models.CharField(max_length=4, choices=ORDER_TYPES)

    def __str__(self):
        return f'{self.order_type} Order for {self.prop.name} at {self.price}'


class BuyOrderManager(models.Manager):
    """
    Custom manager for filtering and sorting buy orders by price (ascending).
    """
    def get_queryset(self):
        return super().get_queryset().filter(prop=self.model.prop, order_type=Order.ORDER_TYPES[0][0]).order_by('-price')


class SellOrderManager(models.Manager):
    """
    Custom manager for filtering and sorting sell orders by price (descending).
    """
    def get_queryset(self):
        return super().get_queryset().filter(prop=self.model.prop, order_type=Order.ORDER_TYPES[1][0]).order_by('price')



class OrderBook(models.Model):
    prop = models.ForeignKey(Property, on_delete=models.CASCADE)

    # Use a Manager to filter and sort orders by type
    buy_orders = BuyOrderManager()
    sell_orders = SellOrderManager()
