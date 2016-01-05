package upwm.fractals.gui;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.BoxLayout;
import javax.swing.JColorChooser;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JSpinner;
import javax.swing.SpinnerNumberModel;

import upwm.fractals.Complex;
import upwm.fractals.FractalSet;
import upwm.fractals.Julia;
import upwm.fractals.Mandelbrot;

@SuppressWarnings("serial")
public class FractalsFrame extends JFrame {
	private CanvasPane canvasPanel = new CanvasPane();

	private JPanel contentPanel = new JPanel();
	private JPanel buttonsPanel = new JPanel();
	private FractalSetController fractalSetController;
	
	private FractalSet julia = new Julia();
	private FractalSet mandelbrot = new Mandelbrot();
	
	private JComboBox<FractalSet> chooseSet = new JComboBox<FractalSet>(
			new FractalSet[] { mandelbrot, julia });

	private JColorChooser gradientStartChooser = new JColorChooser(Color.BLACK);
	private JColorChooser gradientEndChooser = new JColorChooser(Color.WHITE);

	private JSpinner spinner = new JSpinner(new SpinnerNumberModel(50, 1, 500, 1));

	private JSpinner reSpinner = new JSpinner(new SpinnerNumberModel(-0.8, -10.0, 10.0, 0.1));
	private JSpinner imSpinner = new JSpinner(new SpinnerNumberModel(0.156, -10.0, 10.0, 0.1));

	private JPanel paramPanel = new JPanel(new FlowLayout());

	public FractalsFrame() {
		initGUI();
	}

	private void initGUI() {
		contentPanel.setLayout(new BorderLayout());
		contentPanel.add(canvasPanel, BorderLayout.CENTER);
		contentPanel.add(buttonsPanel, BorderLayout.WEST);
		buttonsPanel.setLayout(new BoxLayout(buttonsPanel, BoxLayout.Y_AXIS));
		buttonsPanel.add(chooseSet);
		paramPanel.add(reSpinner);
		paramPanel.add(imSpinner);
		buttonsPanel.add(paramPanel);
		paramPanel.setVisible(false);
		buttonsPanel.add(spinner);
		buttonsPanel.add(gradientStartChooser);
		buttonsPanel.add(gradientEndChooser);
		canvasPanel.setPreferredSize(new Dimension(1700, 900));
		setContentPane(contentPanel);
		pack();

		FractalSet set = new Mandelbrot();
		fractalSetController = new FractalSetController(canvasPanel, set);
		fractalSetController.paintGraph();

		canvasPanel.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if (e.getButton() == MouseEvent.BUTTON1) {
					fractalSetController.zoomIn(e.getX(), e.getY());
				} else {
					fractalSetController.zoomOut(e.getX(), e.getY());
				}
			}
		});

		reSpinner.addChangeListener(e -> paramChanged());
		imSpinner.addChangeListener(e -> paramChanged());

		chooseSet.addActionListener(e -> {
			int index = chooseSet.getSelectedIndex();
			FractalSet s = chooseSet.getModel().getElementAt(index);
			paramPanel.setVisible(s.hasParams());
			fractalSetController.setSet(s);
		});
		spinner.addChangeListener(e -> fractalSetController.setIterations(((Number) spinner.getValue()).intValue()));
		gradientStartChooser.getSelectionModel()
				.addChangeListener(e -> fractalSetController.setGradientStart(gradientStartChooser.getColor()));
		gradientEndChooser.getSelectionModel()
				.addChangeListener(e -> fractalSetController.setGradientEnd(gradientEndChooser.getColor()));
		setDefaultCloseOperation(EXIT_ON_CLOSE);

	}

	private void paramChanged() {
		Number re = (Number) reSpinner.getValue();
		Number im = (Number) imSpinner.getValue();
		Complex param = new Complex(re.doubleValue(), im.doubleValue());

		chooseSet.getModel().getElementAt(chooseSet.getSelectedIndex()).setParamValue("c", param);
		fractalSetController.paintGraph();
		chooseSet.repaint();
	}

	public static void main(String[] args) {
		FractalsFrame ff = new FractalsFrame();
		ff.setVisible(true);
	}
}
