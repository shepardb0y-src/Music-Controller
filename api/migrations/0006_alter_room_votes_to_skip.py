# Generated by Django 4.2.7 on 2023-11-12 16:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_room_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='votes_to_skip',
            field=models.IntegerField(default='0', unique=True),
        ),
    ]
