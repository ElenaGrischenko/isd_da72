# Generated by Django 3.1.1 on 2020-09-02 19:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='Email')),
                ('name', models.CharField(max_length=50)),
                ('group_id', models.IntegerField(blank=True, null=True)),
                ('group_name', models.IntegerField(blank=True, null=True)),
                ('is_admin', models.BooleanField(default=False, verbose_name='Admin')),
                ('registered', models.DateTimeField(auto_now_add=True, verbose_name='Registered')),
            ],
            options={
                'verbose_name': 'User',
                'verbose_name_plural': 'Users',
            },
        ),
    ]