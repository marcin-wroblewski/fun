package gwiazdki.forms;

import static java.lang.Math.PI;

import java.awt.FlowLayout;

import javax.swing.JPanel;
import javax.swing.JSpinner;
import javax.swing.SpinnerNumberModel;
import javax.swing.event.ChangeEvent;
import javax.swing.event.ChangeListener;

public class ControlPanel extends JPanel {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4391953451754383587L;
	private JSpinner pointsCount;
	private JSpinner angle;
	private JSpinner innerRadius;
	private JSpinner outerRadius;
	private StarController starController;

	public ControlPanel(StarController starController) {
		this.starController = starController;
		createAndLayoutSpinners();
		setSpinnersListeners();
		initStarController();
	}

	private void createAndLayoutSpinners() {
		pointsCount = new JSpinner(new SpinnerNumberModel(5, 2, 1000, 1));
		angle = new JSpinner(new SpinnerNumberModel(0, 0, 360, 5));
		innerRadius = new JSpinner(new SpinnerNumberModel(100, 10, 1000, 1));
		outerRadius = new JSpinner(new SpinnerNumberModel(200, 20, 1000, 1));

		this.setLayout(new FlowLayout());

		this.add(pointsCount);
		this.add(angle);
		this.add(innerRadius);
		this.add(outerRadius);
	}

	private void setSpinnersListeners() {
		pointsCount.addChangeListener(new ChangeListener() {
			@Override
			public void stateChanged(ChangeEvent e) {
				starController.changePointsCount((Integer) pointsCount
						.getValue());
			}
		});

		angle.addChangeListener(new ChangeListener() {
			@Override
			public void stateChanged(ChangeEvent e) {
				starController.changeAngle(getAngle());
			}
		});

		innerRadius.addChangeListener(new ChangeListener() {
			@Override
			public void stateChanged(ChangeEvent e) {
				starController.resizeInnerCircle(getInnerRadius());
			}
		});

		outerRadius.addChangeListener(new ChangeListener() {
			@Override
			public void stateChanged(ChangeEvent e) {
				starController.resizeOuterCircle(getOuterRadius());
			}
		});

	}

	private void initStarController() {
		starController.changeAngle(getAngle())
				.changePointsCount(getPointsCount())
				.resizeInnerCircle(getInnerRadius())
				.resizeOuterCircle(getOuterRadius());
	}
	
	private int getPointsCount() {
		return (int) pointsCount.getValue();
	}

	private double getAngle() {
		int degrees = (int) angle.getValue();
		return 2.0 * PI * (degrees / 360.0);
	}

	private double getInnerRadius() {
		return ((Integer) innerRadius.getValue()).doubleValue();
	}

	private double getOuterRadius() {
		return ((Integer) outerRadius.getValue()).doubleValue();
	}

	public void refresh() {
		initStarController();
	}
}
